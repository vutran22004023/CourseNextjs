import { CourseModel } from '../../models/index.js';
import mongoose from 'mongoose';
import axios from 'axios';
import 'dotenv/config';
import moment from 'moment';
import 'moment-duration-format';
import PayCourse from '../../models/paycourse.model.js';

class CourseService {
  async getAllCourses(limit, page, sort, filter) {
    const totalCourses = await CourseModel.countDocuments();
    const query = {};
    const options = {
      limit: limit,
      skip: page * limit,
    };
    if (filter) {
      query[filter[0]] = { $regex: filter[1], $options: 'i' };
    }
    if (sort) {
      options.sort = { [sort[1]]: sort[0] };
    }

    const allCourses = await CourseModel.find(query, null, options).select('-chapters').lean();

    return {
      status: 200,
      message: 'Xem tất cả khóa học',
      data: allCourses,
      total: totalCourses,
      pageCurrent: Number(page),
      totalPage: Math.ceil(totalCourses / limit),
    };
  }

  async getDetaiCourse(slug, user) {
    const userId = user?.id;
    let course;

    if (userId) {
      course = await CourseModel.findOne({ slug: slug }).lean();
    } else {
      course = await CourseModel.findOne({ slug: slug }).select('-chapters.videos.video').lean();
    }

    if (!course) {
      return {
        status: 'ERR',
        message: 'Khóa học không tồn tại',
      };
    }

    if (userId && course.price === 'paid') {
      const payCourse = await PayCourse.findOne({
        idUser: userId,
        courseId: course._id,
        paymentStatus: 'completed',
      }).lean();

      if (!payCourse) {
        return {
          status: 'ERR',
          message: 'Bạn chưa thanh toán khóa học này',
        };
      }
    }

    return {
      status: 200,
      data: course,
      message: 'Show dữ liệu thành công',
    };
  }

  async createCourse(data) {
    try {
      const result = await this.dataHandle(data);
      if (result) return result;

      // Create the new course
      const createCourse = await CourseModel.create(data);
      if (createCourse) {
        return {
          status: 200,
          data: createCourse,
          message: 'Đã tạo khóa học thành công',
        };
      }
    } catch (err) {
      const error = this.validator(err);
      if (error) return error;
      throw err;
    }
  }

  async updateCourse(courseId, reqData) {
    const result = await this.dataHandle(reqData);
    if (result) return result;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await CourseModel.findById(courseId).session(session);
      if (!course) {
        return {
          status: 'ERR',
          message: 'Không tìm thấy khóa học!',
        };
      }

      // Handle when delete chapters
      course.chapters = course.chapters.filter((chapter) =>
        reqData.chapters.some((reqChapter) => reqChapter._id && reqChapter._id === chapter._id.toString())
      );

      reqData.chapters.forEach((chapter) => {
        const dbChapter = course.chapters.id(chapter._id);

        // Update existed chapters
        if (dbChapter) {
          dbChapter.namechapter = chapter.namechapter;

          // Handle when delete videos
          dbChapter.videos = dbChapter.videos.filter((video) =>
            chapter.videos.some((reqVideo) => reqVideo._id && reqVideo._id === video._id.toString())
          );

          chapter.videos.forEach((reqVideo) => {
            // Add new videos
            if (!reqVideo._id) dbChapter.videos.push(reqVideo);
            else {
              // Update existed videos
              const dbVideo = dbChapter.videos.id(reqVideo._id);

              if (dbVideo) {
                dbVideo.childname = reqVideo.childname;
                dbVideo.video = reqVideo.video;
                dbVideo.time = reqVideo.time;
                dbVideo.slug = reqVideo.slug;
              }
            }
          });
        } else {
          // Add new chapters
          course.chapters.push(chapter);
        }
      });

      // Update course
      course.name = reqData.name;
      course.description = reqData.description;
      course.price = reqData.price;
      course.priceAmount = reqData.priceAmount;
      course.image = reqData.image;
      course.slug = reqData.slug;
      course.totalVideos = reqData.totalVideos;
      course.totalTime = reqData.totalTime;

      await course.save({ session });
      await session.commitTransaction();

      const updatedCourse = await CourseModel.findById(courseId).lean();
      return {
        status: 200,
        message: `Đã cập nhật khóa học id: ${updatedCourse._id}`,
        data: updatedCourse,
      };
    } catch (err) {
      await session.abortTransaction();
      const error = this.validator(err);
      if (error) return error;
      throw err;
    } finally {
      session.endSession();
    }
  }

  validator(err) {
    if (err.name === 'ValidationError') {
      const field = Object.keys(err.errors)[0];
      const error = err.errors[field];
      if (error.kind === 'unique') {
        const readableField =
          {
            name: 'khóa học',
            childname: 'video',
          }[error.path] || error.path;
        error.message = `Đã có ${readableField} "${error.value}"`;
      }
      return {
        status: 'ERR',
        message: error.message,
      };
    } else if (err.code == 11000) {
      let key = Object.keys(err.keyValue)[0];
      return {
        status: 'ERR',
        message: `Đã có slug "${err.keyValue[key]}"`,
      };
    } else return 0;
  }

  async dataHandle(data) {
    // Trim data
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });

    let totalVideos = 0;
    let totalTime = moment.duration();

    for (const chapter of data.chapters) {
      for (const video of chapter.videos) {
        Object.keys(video).forEach((key) => {
          if (typeof video[key] === 'string') {
            video[key] = video[key].trim();
          }
        });
        totalVideos++;

        // Set video time and handle video link
        if (video.video) {
          const regex = /(?<=embed\/|watch\?v=)[^?]*/;
          const match = video.video.match(regex);
          if (Array.isArray(match) && match[0]) {
            video.video = `https://www.youtube.com/embed/${match[0]}`;
            let time = await this.getVideoDuration(match[0]);
            video.time = time.format('hh:mm:ss');
            totalTime.add(time);
          }
        }
      }
    }

    data.totalVideos = totalVideos;
    if (totalTime.asSeconds() !== 0) data.totalTime = totalTime.format('hh:mm:ss');

    // Check duplicate and empty video slug
    const uniqueValues = new Set();
    let hasDuplicate = false;
    let emptySlug = false;

    data.chapters.some((chapter) => {
      for (let obj of chapter.videos) {
        if (!obj.slug) {
          emptySlug = true;
          break;
        } else if (uniqueValues.has(obj.slug)) {
          hasDuplicate = true;
          break;
        }
        uniqueValues.add(obj.slug);
      }
      return emptySlug || hasDuplicate;
    });

    if (emptySlug)
      return {
        status: 'ERR',
        message: 'Thiếu slug video',
      };
    else if (hasDuplicate)
      return {
        status: 'ERR',
        message: 'Slug video trong các chương bị trùng lặp',
      };
    else return 0;
  }

  async getVideoDuration(id) {
    try {
      const apiKey = process.env.ID_YOUTUBE;
      const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${apiKey}`;

      const res = await axios.get(url);
      let duration = res.data.items[0]?.contentDetails.duration;
      if (!duration) return null;
      duration = moment.duration(duration);
      return duration;
    } catch (err) {
      console.log('CourseService ~ getVideoDuration ~ err:', err);
      return null;
    }
  }
}

export default new CourseService();

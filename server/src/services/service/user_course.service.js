import { CourseModel } from '../../models/index.js';
import 'dotenv/config';
import { UserCourse } from '../../models/user_course.model.js';
import PayCourse from '../../models/paycourse.model.js';

class UserCourseService {
  async startUserCourse(data) {
    try {
      let { userId, courseId } = data;

      const course = await CourseModel.findById(courseId).populate({
        path: 'chapters',
        model: 'Chapter',
        populate: {
          path: 'videos',
          model: 'Video',
        },
      });

      if (!course) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      const userCourse = await UserCourse.findOne({
        userId: userId,
        courseId: courseId,
      });

      if (!userCourse) {
        // Kiểm tra payment
        if (course.price === 'paid') {
          const payCourse = await PayCourse.findOne({
            idUser: userId,
            courseId: courseId,
            paymentStatus: 'completed',
          }).lean();

          if (!payCourse) {
            return {
              status: 'ERR',
              message: 'Bạn chưa thanh toán khóa học này',
            };
          }
        }

        // Khởi tạo dữ liệu nếu người dùng chưa học khóa học này
        const chapters = course.chapters.map((chapter, chapterIndex) => ({
          chapterId: chapter._id,
          videos: chapter.videos.map((video, videoIndex) => ({
            videoId: video._id,
            status: chapterIndex === 0 && videoIndex === 0 ? 'in_progress' : 'not_started',
          })),
        }));

        const userCourse = await UserCourse.create({ userId, courseId, chapters });

        return {
          status: 200,
          data: userCourse,
          message: 'Đã lưu tiến độ học',
        };
      }

      // Handle if delete chapters
      userCourse.chapters = userCourse.chapters.filter((uc) => course.chapters.some((c) => c._id.equals(uc.chapterId)));

      // Đồng bộ chương
      course.chapters.forEach((courseChapter) => {
        const userChapter = userCourse.chapters.find((uc) => uc.chapterId.equals(courseChapter._id));
        if (!userChapter) {
          userCourse.chapters.push({
            chapterId: courseChapter._id,
            videos: courseChapter.videos.map((video, videoIndex) => ({
              videoId: video._id,
              status: videoIndex === 0 ? 'in_progress' : 'not_started',
            })),
          });
        } else {
          // Handle if delete videos
          userChapter.videos = userChapter.videos.filter((uv) =>
            courseChapter.videos.some((cv) => cv._id.equals(uv.videoId))
          );

          // Đồng bộ video trong chương
          courseChapter.videos.forEach((courseVideo) => {
            const userVideo = userChapter.videos.find((uv) => uv.videoId.equals(courseVideo._id));
            if (!userVideo) {
              userChapter.videos.push({
                videoId: courseVideo._id,
                status: 'not_started',
              });
            }
          });
        }
      });

      await userCourse.save();

      return {
        status: 200,
        data: userCourse,
        message: 'Lấy tiến độ học thành công',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async updateProgress(data) {
    try {
      const { userId, courseId, videoId } = data;

      // Tìm và cập nhật trạng thái video hiện tại thành 'completed'
      const userCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId, 'chapters.videos.videoId': videoId },
        {
          $set: {
            'chapters.$[chapter].videos.$[video].status': 'completed',
          },
        },
        {
          new: true,
          arrayFilters: [{ 'chapter.videos.videoId': videoId }, { 'video.videoId': videoId }],
        }
      );

      if (!userCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      let nextVideo = null;
      let chapterCompleted = false;

      // Kiểm tra xem tất cả các video trong chương hiện tại đã hoàn thành chưa
      for (let chapter of userCourse.chapters) {
        const currentVideoIndex = chapter.videos.findIndex((v) => v.videoId.toString() === videoId.toString());
        if (currentVideoIndex !== -1) {
          const allVideosCompleted = chapter.videos.every((v) => v.status === 'completed');
          if (allVideosCompleted) {
            chapterCompleted = true;
          } else {
            const nextVideoIndex = currentVideoIndex + 1;
            if (nextVideoIndex < chapter.videos.length) {
              nextVideo = chapter.videos[nextVideoIndex];
            }
            break;
          }
        }
      }

      if (chapterCompleted) {
        // Chuyển sang chương tiếp theo và đặt video đầu tiên thành 'in_progress'
        for (let i = 0; i < userCourse.chapters.length; i++) {
          const chapter = userCourse.chapters[i];
          const allVideosCompleted = chapter.videos.every((v) => v.status === 'completed');
          if (allVideosCompleted && i + 1 < userCourse.chapters.length) {
            nextVideo = userCourse.chapters[i + 1].videos[0];
            break;
          }
        }
      }
      if (!nextVideo) {
        return {
          status: 200,
          message: 'Progress updated, but there is no next video',
          data: userCourse,
        };
      }

      // Tìm video kế tiếp và cập nhật trạng thái của nó thành 'in_progress'
      const updatedCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId, 'chapters.videos.videoId': nextVideo.videoId },
        {
          $set: {
            'chapters.$[chapter].videos.$[video].status': 'in_progress',
          },
        },
        {
          new: true,
          arrayFilters: [{ 'chapter.videos.videoId': nextVideo.videoId }, { 'video.videoId': nextVideo.videoId }],
        }
      );

      return {
        status: 200,
        message: 'Progress updated',
        data: updatedCourse,
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async getCourseProgress(data) {
    try {
      let userCourses = await UserCourse.find({ userId: data.id })
        .select('chapters.videos.status updatedAt')
        .populate({
          path: 'courseId',
          model: 'Course',
          select: 'name slug image totalVideos',
        })
        .lean();

      userCourses = userCourses.map((userCourse) => {
        const { chapters, courseId, ...rest } = userCourse;

        // Get an array of videos from all chapters
        const allVideos = chapters.flatMap((chapter) => chapter.videos);

        // Get the progress
        const progress = allVideos.filter((video) => video.status === 'completed').length;

        return {
          ...rest,
          course: { ...courseId, progress },
        };
      });

      return {
        status: 200,
        data: userCourses,
        message: 'Lấy tiến độ học thành công',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async updateNote(data) {
    try {
      const { userId, courseId, videoId, notes } = data;
      const userCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId },
        {
          $set: {
            'chapters.$[].videos.$[video].notes': notes,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'video.videoId': videoId }],
        }
      );

      if (!userCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      return {
        status: 200,
        message: 'Cập nhật ghi chú thành công!',
        data: userCourse,
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async createNote(data) {
    try {
      const { userId, courseId, videoId, notes } = data;

      const userCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId },
        {
          $push: {
            'chapters.$[].videos.$[video].notes': notes,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'video.videoId': videoId }],
        }
      );

      if (!userCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      return {
        status: 200,
        message: 'Tạo ghi chú thành công!',
        data: userCourse,
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async getAllNotes(data) {
    try {
      const { userId, courseId, videoId, currentChapter, nextChapter, sortOrder, page = 1, limit = 10 } = data;
  
      const sortOption = sortOrder === 'newest' ? -1 : 1; // -1 for newest first, 1 for oldest first
      const pageNumber = parseInt(page);
      const pageSize = parseInt(limit);
  
      // Tìm khóa học theo userId và courseId
      const userCourse = await UserCourse.findOne({
        userId,
        courseId,
      });
  
      if (!userCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }
  
      // Lấy tất cả ghi chú từ chương hiện tại và chương sau
      let notes = [];
      
      // Duyệt qua các chương của khóa học
      userCourse.chapters.forEach((chapter, chapterIndex) => {
        // Kiểm tra nếu chương là chương hiện tại hoặc chương tiếp theo
        if (chapterIndex === parseInt(currentChapter) || chapterIndex === parseInt(nextChapter)) {
          // Duyệt qua các video trong chương
          chapter.videos.forEach((video) => {
            // Kiểm tra nếu videoId khớp với video hiện tại
            if (video.videoId.toString() === videoId.toString()) {
              // Push các ghi chú của video vào danh sách
              notes.push(...video.notes);
            }
          });
        }
      });
  
      // Kiểm tra nếu không tìm thấy ghi chú nào
      if (notes.length === 0) {
        return {
          status: 200,
          message: 'Không có ghi chú nào!',
          currentPage: pageNumber,
          totalPages: 0,
          totalNotes: 0,
          data: [],
        };
      }
  
      // Sắp xếp ghi chú theo thời gian
      notes.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return sortOption === -1 ? dateB - dateA : dateA - dateB;
      });
  
      // Phân trang: tính toán số lượng ghi chú trả về cho trang hiện tại
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedNotes = notes.slice(startIndex, endIndex);
  
      return {
        status: 200,
        message: 'Lấy tất cả ghi chú thành công!',
        currentPage: pageNumber,
        totalPages: Math.ceil(notes.length / pageSize),
        totalNotes: notes.length,
        data: paginatedNotes,
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  validator(err) {
    if (err.name === 'ValidationError') {
      const field = Object.keys(err.errors)[0];
      const error = err.errors[field];
      return {
        status: 'ERR',
        message: error.message,
      };
    } else throw err;
  }

  // async dataHandle(data) {
  //   // Trim data
  //   Object.keys(data).forEach((key) => {
  //     if (typeof data[key] === 'string') {
  //       data[key] = data[key].trim();
  //     }
  //   });

  //   for (const chapter of data.chapters) {
  //     for (const video of chapter.videos) {
  //       Object.keys(video).forEach((key) => {
  //         if (typeof video[key] === 'string') {
  //           video[key] = video[key].trim();
  //         }
  //       });
  //     }
  //   }

  //   // if (emptySlug)
  //   //   return {
  //   //     status: 'ERR',
  //   //     message: 'Thiếu slug video',
  //   //   };
  //   // else if (hasDuplicate)
  //   //   return {
  //   //     status: 'ERR',
  //   //     message: 'Slug video trong các chương bị trùng lặp',
  //   //   };
  //   // else return 0;
  // }
}

export default new UserCourseService();

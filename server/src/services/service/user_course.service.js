import { CourseModel } from '../../models/index.js';
import 'dotenv/config';
import { UserCourse } from '../../models/user_course.model.js';

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
  
      const checkUserCourse = await UserCourse.findOne({
        userId: userId,
        courseId: courseId,
      });
  
      if (!checkUserCourse) {
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
  
      // Đồng bộ dữ liệu khi admin thêm chương hoặc video mới
      const userCourse = await UserCourse.findOne({
        userId: userId,
        courseId: courseId,
      });
  
      // Đồng bộ chương
      course.chapters.forEach(courseChapter => {
        const userChapter = userCourse.chapters.find(uc => uc.chapterId.equals(courseChapter._id));
        if (!userChapter) {
          userCourse.chapters.push({
            chapterId: courseChapter._id,
            videos: courseChapter.videos.map((video, videoIndex) => ({
              videoId: video._id,
              status: videoIndex === 0 ? 'in_progress' : 'not_started',
            })),
          });
        } else {
          // Đồng bộ video trong chương
          courseChapter.videos.forEach(courseVideo => {
            const userVideo = userChapter.videos.find(uv => uv.videoId.equals(courseVideo._id));
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

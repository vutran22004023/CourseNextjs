import mongoose from 'mongoose';

const note = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const videoStatusSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    progress: { type: Number, default: 0 },
    notes: [note],
  },
  {
    timestamps: true,
  }
);

const chapterStatusSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    videos: [videoStatusSchema],
  },
  {
    timestamps: true,
  }
);

const userCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    chapters: [chapterStatusSchema],
  },
  {
    timestamps: true,
  }
);

const UserCourse = mongoose.model('UserCourse', userCourseSchema);

export { UserCourse };

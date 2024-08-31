import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const videoChatSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const chapterChatSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    videos: [videoChatSchema],
  },
  {
    timestamps: true,
  }
);

const courseChatSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    chapters: [chapterChatSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CourseChat', courseChatSchema);

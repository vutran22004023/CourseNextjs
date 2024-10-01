import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Yêu cầu id của người dùng'],
    },
    nameAlgorithm: {
      type: String,
      required: [true, 'Tiêu đề không được để trống!'],
    },
    solution: {
      type: String,
      required: [true, 'Nội dung không được để trống!'],
    },
    result: {
      type: Number,
    },
    expected_result: {
      type: Number,
    },
    message: {
      type: String,
      required: [true, 'Nội dung không được để trống!'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('TournamentHistory', postSchema);

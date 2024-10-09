import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Yêu cầu id của người dùng'],
    },
    title: {
      type: String,
      required: [true, 'Tiêu đề không được để trống!'],
    },
    content: {
      type: String,
      required: [true, 'Nội dung không được để trống!'],
    },
    tag: {
      type: String,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      slug: 'title',
      slugPaddingSize: 4,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

export default mongoose.model('Post', postSchema);

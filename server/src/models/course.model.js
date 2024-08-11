import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const videoSchema = new mongoose.Schema(
  {
    childname: {
      type: String,
      maxLength: [255, 'Tiêu đề video quá dài'],
      required: [true, 'Chưa có tiêu đề video'],
    },
    video: {
      type: String,
      required: [true, 'Chưa có đường dẫn video'],
    },
    time: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chapterSchema = new mongoose.Schema(
  {
    namechapter: {
      type: String,
      maxLength: [255, 'Tiêu đề chương quá dài'],
      required: [true, 'Chưa có tiêu đề chương'],
    },
    videos: [videoSchema],
  },
  {
    timestamps: true,
  }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [255, 'Tiêu đề khóa học quá dài'],
      required: [true, 'Chưa có tiêu đề khóa học'],
    },
    description: {
      type: String,
      // required: [true, 'Chưa có mô tả khóa học'],
    },
    image: {
      type: String,
      maxLength: [255, 'Đường dẫn hình ảnh vượt quá 255 ký tự'],
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    chapters: [chapterSchema],
    price: {
      type: String,
      required: [true, 'Chưa chọn loại khóa học'],
      enum: { values: ['free', 'paid'], message: 'Loại khóa học chỉ cho phép giá trị free hoặc paid' },
    },
    priceAmount: {
      type: Number,
      required: [
        function () {
          return this.price === 'paid';
        },
        'Chưa có số tiền',
      ],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Chưa có slug của khóa học'],
    },
    view: {
      type: Number,
      default: 0,
    },
    totalVideos: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(uniqueValidator);

export default mongoose.model('Course', courseSchema);

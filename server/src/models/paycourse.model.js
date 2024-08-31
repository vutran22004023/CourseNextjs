import mongoose from 'mongoose';

// Tạo schema cho collection paycourse
const payCourseSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    money: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo model và export
const PayCourse = mongoose.model('paycourse', payCourseSchema);
export default PayCourse;

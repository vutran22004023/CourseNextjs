import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'teacher'],
      required: function() {
        return !this.isAdmin; 
      },
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;

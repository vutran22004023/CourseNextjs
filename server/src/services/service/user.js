import { UserModel } from '../../models/index.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const getAllUsers = async (limit, page, sort, filter) => {
  try {
    const totalUsers = await UserModel.countDocuments();
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

    const allUsers = await UserModel.find(query, null, options).select('-password').lean();

    return {
      status: 200,
      message: 'Xem tất cả các người dùng',
      data: allUsers,
      total: totalUsers,
      pageCurrent: Number(page),
      totalPage: Math.ceil(totalUsers / limit),
    };
  } catch (err) {
    return {
      status: 404,
      message: err.message,
    };
  }
};

const getDetailUser = async (id) => {
  try {
    const checkUser = await UserModel.findOne({
      _id: id,
    }).select('-password');
    if (!checkUser) {
      return {
        status: 'ERR',
        message: 'Id không tồn tại',
      };
    }
    return {
      status: 200,
      message: `Show thông tin của id: ${checkUser.id}`,
      data: {
        password: 'Not password',
        ...checkUser._doc,
      },
    };
  } catch (err) {
    return {
      status: 'ERR',
      message: err,
    };
  }
};

const updateUser = async (id, data, isAdmin) => {
  try {
    const checkUser = await UserModel.findOne({
      _id: id,
    });
    if (!checkUser) {
      return {
        status: 'ERR',
        message: 'Id không tồn tại',
      };
    }
    if (!isAdmin) {
      delete data.isAdmin;
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const updateUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return {
      status: 200,
      message: `Cập nhập thành công id : ${updateUser._id}`,
      data: {
        ...updateUser._doc,
      },
    };
  } catch (err) {
    return {
      status: 'ERR',
      message: err,
    };
  }
};

const deleteUser = async (id) => {
  try {
    const checkUser = await UserModel.findOne({
      _id: id,
    });
    if (!checkUser) {
      return {
        status: 'ERR',
        message: 'Id không tồn tại',
      };
    }
    const deleteUser = await UserModel.findByIdAndDelete(id, { new: true });
    return {
      status: 200,
      message: `Xóa thành công id : ${deleteUser._id}`,
    };
  } catch (err) {
    return {
      status: 'ERR',
      message: err,
    };
  }
};

const deleteManyUser = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return {
        status: 'ERR',
        message: 'Danh sách ID không hợp lệ hoặc trống',
      };
    }
    const validIds = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
      return {
        status: 400,
        message: 'Một hoặc nhiều ID không hợp lệ',
      };
    }
    await UserModel.deleteMany({ _id: { $in: ids } });
    return {
      status: 200,
      message: 'Xóa người dùng thành công',
    };
  } catch (err) {
    return {
      status: 'ERR',
      message: err,
    };
  }
};

const createUser = async (user) => {
  try {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const checkUser = await UserModel.findOne({
      email: email,
    });
    if (checkUser !== null) {
      return {
        status: 'ERR',
        message: 'Tài Khoản đã tồn tại',
      };
    }
    const createdUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (createdUser) {
      return {
        status: 200,
        message: 'Tạo người dùng thành công',
        data: {
          ...createdUser._doc,
          // password: 'not password',
        },
      };
    } else {
      throw new Error('Tạo người dùng thất bại.');
    }
  } catch (err) {
    return {
      status: 'ERR',
      message: err,
    };
  }
};

export default {
  getAllUsers,
  getDetailUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  createUser,
};

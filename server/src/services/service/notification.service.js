import Notification from '../../models/notification.model.js';
import admin from '../../configs/firebase_admin.config.js';
import 'dotenv/config';

class NotificationService {
  async send(data) {
    try {
      let { title, content, icon } = data;
      const notification = await Notification.create({ title, content, icon });
      const message = {
        topic: 'test',
        notification: {
          title: notification.title,
          body: notification.content,
          icon: notification.icon,
        },
      };
      await admin.messaging().send(message);
      return {
        status: 200,
        message: 'Gửi thông báo thành công',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async delete(id) {
    try {
      const result = await Notification.deleteOne({ _id: id });
      return {
        status: 200,
        data: result,
        message: 'Xóa thông báo thành công!',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi!',
        error: err.message,
      };
    }
  }

  async deleteAll() {
    try {
      const result = await Notification.deleteMany();
      return {
        status: 200,
        data: result,
        message: 'Xóa thông báo thành công!',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi!',
        error: err.message,
      };
    }
  }

  async get(limit, page, sort, filter) {
    const total = await Notification.countDocuments();
    const query = {};
    const options = {
      limit: limit,
      skip: page * limit,
    };
    if (filter) {
      query[filter[0]] = { $regex: filter[1], $options: 'i' };
    }
    options.sort = { [sort[1]]: sort[0] };

    const result = await Notification.find(query, null, options).lean();

    return {
      status: 200,
      message: 'Xem tất cả thông báo',
      data: result,
      total: total,
      pageCurrent: Number(page),
      totalPage: Math.ceil(total / limit),
    };
  }
}

export default new NotificationService();

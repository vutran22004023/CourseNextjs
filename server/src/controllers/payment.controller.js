import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import qs from 'qs';
import PayOS from '@payos/node';
import * as dotenv from 'dotenv';
dotenv.config();
import PayCourse from '../models/paycourse.model.js';

const payos = new PayOS(`${process.env.CLIENT_ID}`, `${process.env.API_KEY}`, `${process.env.CHECKSUM_KEY}`);
class PayMentController {
  // begin api thanh toans PayOS
  async createLinkPayOs(req, res) {
    const { fullName, totalPrice, email } = req.body;
    const transID = Math.floor(Math.random() * 1000000000);
    const order = {
      orderCode: transID,
      amount: totalPrice,
      description: `VQRIO${transID}`,
      buyerName: fullName,
      buyerEmail: email,
      cancelUrl: `${process.env.URL_CLIENT}/information-pay`,
      returnUrl: `${process.env.URL_CLIENT}/information-pay`,
    };
    try {
      const paymentLinkData = await payos.createPaymentLink(order);
      return res.status(200).json(paymentLinkData);
    } catch (err) {
      const paymentLinkData = await payos.createPaymentLink(order);
      res.redirect(303, paymentLinkData.checkoutUrl);
    }
  }

  async receiveHookPayOs(req, res) {
    res.json();
  }

  async getPaymentInfomationsPayOs(req, res) {
    const orderCode = req.params.idorder;
    try {
      const paymentLinkInfo = await payos.getPaymentLinkInformation(orderCode);
      return res.status(200).json(paymentLinkInfo);
    } catch (err) {
      console.log(err.message);
    }
  }

  async canceledPaymentLinkPayOs(req, res) {
    const orderCode = req.params.idorder;
    try {
      const paymentLinkInfo = await payos.cancelPaymentLink(orderCode);
      return res.status(200).json(paymentLinkInfo);
    } catch (err) {
      console.log(err.message);
    }
  }

  async confirmWebhookPayOs(req, res) {
    try {
      const confirmWebhookPayOs = await payos.confirmWebhook('https://0d6a-14-224-175-102.ngrok-free.app/receive-hook');
      return res.status(200).json(confirmWebhookPayOs);
    } catch (err) {
      console.log(err.message);
    }
  }
  // end api thanh toans PayOS

  // begin api thanh toán ZaloPay

  async createPaymentZaloPay(req, res) {
    const config = {
      app_id: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };
    const { orderItem, fullName, address, phone, paymentMethod, itemsPrice, shippingPrice, totalPrice, user } =
      req.body;
    const embed_data = {
      redirecturl: `${process.env.URL_CLIENT}/information-pay`,
    };
    const items = orderItem
      ? {
          itemid: orderItem.productId,
        }
      : {};
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // mã giao dich có định dạng yyMMdd_xxxx
      app_user: fullName,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify([items]),
      embed_data: JSON.stringify(embed_data),
      amount: totalPrice,
      description: `Zalo - Thanh toán đơn hàng #${transID}`,
      // bank_code: "zalopayapp",
      callback_url: 'https://655a-118-71-134-202.ngrok-free.app/callback-zalo',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, null, { params: order });
      return res.status(200).json({
        ...result.data,
        itemid: orderItem.productId,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async callbackZaloPay(req, res) {
    const config = {
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    };
    let result = {};

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);

        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
  }

  async orderStatusZaloPay(req, res) {
    const app_trans_id = req.params.apptransid;
    const config = {
      appid: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid',
    };
    let postData = {
      appid: config.appid,
      apptransid: app_trans_id, // Input your apptransid
    };

    let data = postData.appid + '|' + postData.apptransid + '|' + config.key1; // appid|apptransid|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
      method: 'post',
      url: config.endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };

    try {
      const result = await axios(postConfig);
      return res.status(200).json(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async transactionRefund(req, res) {
    const config = {
      app_id: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sandbox.zalopay.com.vn/v001/tpe/partialrefund',
    };
    const timestamp = Date.now();
    const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id

    let params = {
      app_id: config.app_id,
      mrefundid: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
      timestamp, // miliseconds
      zptransid: '190508000000022',
      amount: '50000',
      description: 'ZaloPay Refund Demo',
    };

    // appid|zptransid|amount|description|timestamp
    let data =
      params.app_id + '|' + params.zptransid + '|' + params.amount + '|' + params.description + '|' + params.timestamp;
    params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    axios
      .post(config.endpoint, null, { params })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  async transactionRefundStatus(req, res) {
    const config = {
      app_id: '2554',
      key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
      key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
      endpoint: 'https://sandbox.zalopay.com.vn/v001/tpe/getpartialrefundstatus',
    };
    const params = {
      app_id: config.app_id,
      timestamp: Date.now(), // miliseconds
      mrefundid: '190312_553_123456',
    };

    const data = config.app_id + '|' + params.mrefundid + '|' + params.timestamp; // appid|mrefundid|timestamp
    params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    axios
      .get(config.endpoint, { params })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  // end api thanh toans zalopay

  //begin thông tin thanh toán khóa học
  async getInformationCourse(req, res) {
    try {
      const { page = 1, limit = 10, search = '', sort = 'desc' } = req.query;

      // Tính toán phân trang
      const skip = (Number(page) - 1) * Number(limit);

      // Điều kiện tìm kiếm
      const searchCondition = search
        ? {
            $or: [
              { 'courseId.name': { $regex: search, $options: 'i' } },
              { 'idUser.name': { $regex: search, $options: 'i' } },
            ],
          }
        : {};

      // Tính tổng số trạng thái thanh toán
      const totalStatus = await PayCourse.aggregate([
        {
          $group: {
            _id: '$paymentStatus',
            count: { $sum: 1 },
          },
        },
      ]);

      // Tìm paycourses với phân trang, tìm kiếm và sắp xếp
      const payCourses = await PayCourse.find(searchCondition)
        .populate({
          path: 'idUser', // Populate thông tin từ bảng User
          select: 'name email', // Lấy các trường name và email từ bảng User
        })
        .populate({
          path: 'courseId', // Populate thông tin từ bảng Course
          select: 'name image money', // Lấy các trường name, image, và money từ bảng Course
        })
        .sort({ createdAt: sort === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(Number(limit));

      // Tính tổng số lượng paycourse sau khi tìm kiếm
      const totalPayCourses = await PayCourse.countDocuments(searchCondition);

      // Trả về kết quả
      return res.status(200).json({
        totalStatus,
        totalPayCourses,
        currentPage: Number(page),
        totalPages: Math.ceil(totalPayCourses / Number(limit)),
        payCourses,
      });
    } catch (err) {
      console.error('Lỗi khi lấy thông tin thanh toán:', err);
      return res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình lấy thông tin',
        error: err.message || 'Không xác định được lỗi',
      });
    }
  }
  async postInformationCourse(req, res) {
    try {
      const { idUser, courseId, paymentStatus, money } = req.body;

      // Kiểm tra các giá trị đầu vào
      if (!idUser || !courseId || !paymentStatus || !money) {
        return res.status(400).json({ message: 'Thiếu thông tin yêu cầu' });
      }

      // Tạo mới document PayCourse
      const newPayCourse = new PayCourse({
        idUser,
        courseId,
        paymentStatus,
        money,
      });

      await newPayCourse.save();

      return res.status(201).json({
        message: 'Thanh toán thành công',
      });
    } catch (err) {
      // Xử lý lỗi
      console.error('Lỗi khi lưu dữ liệu paycourse:', err);
      return res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình xử lý',
        error: err.message || 'Không xác định được lỗi',
      });
    }
  }

  async updateInformationCourse(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Tìm và cập nhật paycourse theo ID
      const updatedPayCourse = await PayCourse.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedPayCourse) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin paycourse để cập nhật' });
      }

      // Trả về thông báo thành công và dữ liệu đã cập nhật
      return res.status(200).json({ message: 'Cập nhật thông tin paycourse thành công', data: updatedPayCourse });
    } catch (err) {
      console.error('Lỗi khi cập nhật thông tin thanh toán:', err);
      return res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình cập nhật thông tin',
        error: err.message || 'Không xác định được lỗi',
      });
    }
  }

  async deleteInformationCourse(req, res) {
    try {
      const { id } = req.params;

      // Tìm và xóa paycourse theo ID
      const deletedPayCourse = await PayCourse.findByIdAndDelete(id);

      if (!deletedPayCourse) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin paycourse để xóa' });
      }

      // Trả về thông báo thành công
      return res.status(200).json({ message: 'Xóa thông tin paycourse thành công', data: deletedPayCourse });
    } catch (err) {
      console.error('Lỗi khi xóa thông tin thanh toán:', err);
      return res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình xóa thông tin',
        error: err.message || 'Không xác định được lỗi',
      });
    }
  }
  //end thông tin thanh toán khóa học

  async checkPaidCourse(req, res) {
    try {
      const { courseId } = req.params;

      const paidCourse = await PayCourse.findOne({
        idUser: req.user.id,
        courseId: courseId,
        paymentStatus: 'completed',
      }).lean();

      if (!paidCourse) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin paycourse' });
      }

      return res.status(200).json({ message: 'Đã thanh toán khóa học', data: paidCourse });
    } catch (err) {
      console.error('Lỗi khi lấy thông tin thanh toán:', err);
      return res.status(500).json({
        message: 'Có lỗi xảy ra trong quá trình lấy thông tin',
        error: err.message || 'Không xác định được lỗi',
      });
    }
  }
  //end thông tin thanh toán khóa học
}

export default new PayMentController();

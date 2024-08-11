import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import qs from 'qs';
import PayOS from '@payos/node';
import * as dotenv from 'dotenv';
dotenv.config();

const payos = new PayOS(`${process.env.CLIENT_ID}`, `${process.env.API_KEY}`, `${process.env.CHECKSUM_KEY}`);
class PayMentController {
  // begin api thanh toans PayOS
  async createLinkPayOs(req, res) {
    const { oderItem, fullName, address, phone, paymentMethod, itemsPrice, shippingPrice, totalPrice, user, email } =
      req.body;
    const transID = Math.floor(Math.random() * 1000000000);
    const items = oderItem.map((item) => ({
      name: item.name,
      quantity: item.amount,
      price: parseFloat(item.price),
    }));
    const order = {
      orderCode: transID,
      amount: totalPrice,
      description: `VQRIO${transID}`,
      buyerName: fullName,
      buyerEmail: email,
      buyerPhone: phone,
      buyerAddress: address,
      items: items,
      cancelUrl: `${process.env.URL_CLIENT}/trang-thai`,
      returnUrl: `${process.env.URL_CLIENT}/trang-thai`,
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
    const { oderItem, fullName, address, phone, paymentMethod, itemsPrice, shippingPrice, totalPrice, user } = req.body;
    const embed_data = {
      redirecturl: `${process.env.URL_CLIENT}/trang-thai`,
    };

    // const items = [{
    //   itemid: "knb",
    //   itemname: "kim nguyen bao",
    //   itemprice: 198400,
    //   itemquantity: 1
    // }];

    const items = oderItem
      ? oderItem?.map((item) => ({
          itemid: item.productId,
          itemname: item.name,
          itemprice: item.price,
          itemquantity: item.amount,
        }))
      : [];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // mã giao dich có định dạng yyMMdd_xxxx
      app_user: fullName,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalPrice,
      description: `Zalo - Thanh toán đơn hàng #${transID}`,
      // bank_code: "zalopayapp",
      callback_url: 'https://1547-112-197-208-25.ngrok-free.app/callback-zalo',
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
      return res.status(200).json(result.data);
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
}

export default new PayMentController();

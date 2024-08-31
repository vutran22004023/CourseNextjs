import { Login_Register_Service } from '../services/index.js';
import axios from 'axios';
import 'dotenv/config';

class AuthController {
  async loginInGoogle(req, res) {
    try {
      const { displayName, email, photoURL } = req.body;
      if (!displayName || !email || !photoURL) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin',
        });
      }
      const response = await Login_Register_Service.loginUserGoogle(req.body);
      const { refresh_Token, access_Token, ...newResponse } = response;
      if (refresh_Token) {
        res.cookie('access_Token', response.access_Token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          path: '/',
        });
        res.cookie('refresh_Token', refresh_Token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          path: '/',
        });
      }
      return res.status(200).json(newResponse);
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }

  async loginIn(req, res) {
    try {
      const { email, password } = req.body;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isCheckEmail = mailformat.test(email);
      if (!email || !password) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin ',
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Email nhập chưa đúng',
        });
      }
      const response = await Login_Register_Service.LoginIn(req.body);
      if (response.status === 'ERR') {
        return res.status(401).json(response);
      }

      res.cookie('access_Token', response.access_Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });

      res.cookie('refresh_Token', response.refresh_Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }

  async Register(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isCheckEmail = mailformat.test(email);
      if (!name || !email || !password || !confirmPassword) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin',
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Email nhập chưa đúng',
        });
      } else if (password !== confirmPassword) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Nhập lại mật khẩu không khớp',
        });
      }

      const emailVerificationResponse = await axios.get(`${process.env.URL_VERIFICATION_API}`, {
        params: { email, apikey: process.env.EMAIL_VERIFICATION_API_KEY },
      });

      if (emailVerificationResponse.data.result !== 'deliverable') {
        return res.status(200).json({
          status: 'ERR',
          message: 'Email không tồn tại',
        });
      }

      const response = await Login_Register_Service.Register(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }

  logout(req, res) {
    try {
      // Xóa cookie accessToken và refreshToken
      res.clearCookie('access_Token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });

      res.clearCookie('refresh_Token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      });

      return res.status(200).json({
        status: 'OK',
        message: 'Đăng xuất thành công',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Đã xảy ra lỗi, vui lòng thử lại',
        error: err.message,
      });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isCheckEmail = mailformat.test(email);
      if (!email) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền email',
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Email nhập chưa đúng định dạng',
        });
      }
      const response = await Login_Register_Service.forgotPassword(email);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Đã xảy ra lỗi, vui lòng thử lại',
        error: err.message,
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { password, confirmPassword } = req.body;
      const id = req.user.id;
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: 'ERR',
          message: 'Mật khẩu xác nhận không khớp',
        });
      }
      const response = await Login_Register_Service.resetPassword(id, password);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Đã xảy ra lỗi, vui lòng thử lại',
        error: err.message,
      });
    }
  }

  async authenticateUser(req, res) {
    try {
      const { status } = req.body;
      const id = req.user.id;
      const response = await Login_Register_Service.authenticateUser(id, status);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        status: 'ERR',
        message: 'Đã xảy ra lỗi, vui lòng thử lại',
        error: err.message,
      });
    }
  }
}

export default new AuthController();

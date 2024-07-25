import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TokenMiddleware } from './index.js';

class AuthMiddleware {
  authAdmin(req, res, next) {
    const authHeader = req.headers.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Token không hợp lệ hoặc không có token',
      });
    }
    const token = req.headers.token.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Token không đúng',
        });
      }
      if (user?.isAdmin === true) {
        next();
      } else {
        return res.status(404).json({
          status: 'ERR',
          message: 'Tài khoản không có quyền admin',
        });
      }
    });
  }

  authUser(req, res, next) {
    const authHeader = req.headers.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Token không hợp lệ hoặc không có token',
      });
    }
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Token không đúng',
        });
      }
      if (user?.isAdmin === true || user?.id === userId) {
        req.user = user;
        next();
      } else {
        return res.status(404).json({
          status: 'ERR',
          message: 'Tài khoản không có quyền admin',
        });
      }
    });
  }

  verifyResetToken(req, res, next) {
    const token = req.headers.token.split(' ')[1];
    return jwt.verify(token, process.env.RESET_TOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Token không đúng',
        });
      }
      if (user) {
        req.user = user;
        next();
      }
    });
  }

  refreshAccessToken(req, res) {
    const refreshToken = req.headers.token.split(' ')[1];
    if (!refreshToken) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Không có refreshToken được cung cấp',
      });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 'ERR',
          message: 'RefreshToken không hợp lệ',
        });
      }
      // Generate new access token
      const accessToken = TokenMiddleware.generateAccessToken(user._id, user.isAdmin);
      // console.log(accessToken)
      // // Set the new accessToken in a cookie
      // res.cookie('access_Token', accessToken, {
      //     httpOnly: false, // Corrected property name
      //     secure: false,
      //     samesite: 'strict',
      //     maxAge: 15 * 60 * 1000
      // });

      // Return new access token to client
      return res.status(200).json({
        accessToken: accessToken,
      });
    });
  }
}

export default new AuthMiddleware();

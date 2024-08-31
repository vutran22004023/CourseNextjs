import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TokenMiddleware } from './index.js';

class AuthMiddleware {
  isTokenExpiringSoon = (token) => {
    try {
      const decodedToken = jwt.decode(token);
      if (!decodedToken.exp) {
        return false;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decodedToken.exp - currentTime;

      return timeLeft < 30; // Kiểm tra nếu token sẽ hết hạn trong 5 phút (300 giây)
    } catch (e) {
      console.error('Failed to decode token', e);
      return false;
    }
  };

  authAdmin = async (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Token không hợp lệ hoặc không có token',
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Token không đúng',
        });
      }
      if (this.isTokenExpiringSoon(token)) {
        try {
          const newAccessToken = await TokenMiddleware.generateAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
          });

          if (!newAccessToken) {
            throw new Error('Failed to generate access token');
          }

          res.cookie('access_Token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
          });
        } catch (error) {
          console.error('Error while setting access token cookie:', error);
        }
      }
      if (user?.isAdmin) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({
          status: 'ERR',
          message: 'Tài khoản không có quyền admin',
        });
      }
    });
  };

  authUser = async (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Token không hợp lệ hoặc không có token',
      });
    }

    const token = authHeader.split(' ')[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) {
        return res.status(404).json({
          status: 'ERR',
          message: 'Token không đúng',
        });
      }
      if (this.isTokenExpiringSoon(token)) {
        try {
          const newAccessToken = await TokenMiddleware.generateAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
          });
          if (!newAccessToken) {
            throw new Error('Failed to generate access token');
          }

          res.cookie('access_Token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
          });
        } catch (error) {
          console.error('Error while setting access token cookie:', error);
        }
      }
      if (user?.isAdmin || user?.id === userId) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({
          status: 'ERR',
          message: 'Bạn không có quyền truy cập',
        });
      }
    });
  };

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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Token không hợp lệ hoặc không có token',
      });
    }

    const refreshToken = authHeader.split(' ')[1]; // Nhận refreshToken từ header
    if (!refreshToken) {
      return res.status(401).json({
        status: 'ERR',
        message: 'Không có refreshToken được cung cấp',
      });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 'ERR',
          message: 'RefreshToken không hợp lệ',
        });
      }

      try {
        const newAccessToken = await TokenMiddleware.generateAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        if (!newAccessToken) {
          throw new Error('Failed to generate access token');
        }

        res.cookie('access_Token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          path: '/',
        });

        // Trả về accessToken mới cho client
        return res.status(200).json({
          status: 'OK',
          accessToken: newAccessToken, // Sử dụng newAccessToken đã được định nghĩa
        });
      } catch (error) {
        console.error('Error while setting access token cookie:', error);
        return res.status(500).json({
          status: 'ERR',
          message: 'Đã xảy ra lỗi khi tạo access token mới',
          error: error.message,
        });
      }
    });
  }
}

export default new AuthMiddleware();

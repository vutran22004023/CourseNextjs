import redisClient from '../configs/redisClient.config.js';

class CacheMiddleware {
  // Lấy dữ liệu từ cache
  async getCache(req, res, next) {
    const key = req.originalUrl; // Sử dụng URL làm key cho cache

    try {
      const cacheData = await redisClient.get(key); // Lấy dữ liệu từ Redis
      if (cacheData) {
        return res.status(200).json(JSON.parse(cacheData)); // Nếu có cache, trả về cache
      } else {
        next(); // Nếu không có, tiếp tục tới controller
      }
    } catch (error) {
      console.log('Cache error:', error);
      next(); // Nếu lỗi, tiếp tục tới controller
    }
  }

  // Lưu dữ liệu vào cache
  async setCache(key, data, expiration = 3600) { // expiration mặc định 1 giờ
    try {
      await redisClient.set(key, JSON.stringify(data), 'EX', expiration); // Lưu vào Redis với thời gian sống
    } catch (error) {
      console.log('Cache set error:', error);
    }
  }

    // Cập nhật cache (có thể dùng tương tự setCache)
    async updateCache(key, data, expiration = 3600) {
      try {
        await redisClient.set(key, JSON.stringify(data), 'EX', expiration); // Ghi đè cache với key tương ứng
      } catch (error) {
        console.log('Cache update error:', error);
      }
    }

    async clearCache(key) {
      try {
        await redisClient.del(key); // Xóa cache theo key
        console.log(`Cache cleared for key: ${key}`);
      } catch (error) {
        console.log('Cache clear error:', error);
      }
    }
}

export default new CacheMiddleware();

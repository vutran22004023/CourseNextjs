import { createClient } from 'redis';
import 'dotenv/config';

const redisClient = createClient({
  url: process.env.REDIS_URI, // Redis URI được lấy từ file .env
});

export default redisClient;

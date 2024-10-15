import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './configs/passport.config.js';
import os from 'os';
import redisClient from './configs/redisClient.config.js';
const app = express();

// Get local IP address function
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const interfaceInfo of interfaces[interfaceName]) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIPAddress();
const port = process.env.PORT || 3002;
const origin = `http://${localIP}:3002`;

// Configure CORS with local IP as origin
app.use(
  cors({
    origin: [origin, 'http://localhost:3000'], // Add both local IP and localhost origins
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', routes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Đường dẫn không tồn tại!',
  });
});

// MongoDB connection URL
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qm0ui7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.listen(port, async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log('Connect DB successfully');
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    await redisClient.connect();
    console.log('Connect Redis successfully');
  } catch (err) {
    console.log('Redis connection error:', err);
  }

  console.log(`Listening on port http://${localIP}:${port} with CORS origin ${origin}`);
  console.log(`Listening on port http://localhost:${port} with CORS origin http://localhost:${port}`);
});

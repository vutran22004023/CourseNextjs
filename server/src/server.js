import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './configs/passport.config.js';

const app = express();

app.use(cors());
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

const port = process.env.PORT || 3002;
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qm0ui7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const url = 'mongodb://localhost:27017/learning_website';

app.listen(port, async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log('Connect DB successfully');
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('listening on port http://localhost:' + port);
});

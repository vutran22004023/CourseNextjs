import Course from '../models/course.model.js';
import { CourseService } from '../services/index.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {CacheMiddleware} from '../middlewares/index.js'
dotenv.config();

class CourseController {
  // Get all courses
  async index(req, res) {
    try {
      const cacheKey = req.originalUrl;
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : null;
      const filterArray = filter ? filter.split(':') : null;
      const result = await CourseService.getAllCourses(limitValue, pageValue, sortArray, filterArray);
      await CacheMiddleware.setCache(cacheKey, result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course detail
  async get(req, res) {
    try {
      const cacheKey = req.originalUrl;
      const { slug } = req.params;
      const result = await CourseService.getDetaiCourse(slug, req?.user);
      await CacheMiddleware.setCache(cacheKey, result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add course
  async add(req, res) {
    try {
      // Call the service method to create the course
      const result = await CourseService.createCourse(req.body);
      await CacheMiddleware.clearCache(`/api/course/all-courses`);
      // Send the result back to the client
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin ',
        });
      if (!mongoose.isValidObjectId(id)) {
        return res.status(200).json({ status: 'ERR', message: 'ID không hợp lệ!' });
      }
      const result = await Course.findOneAndDelete({ _id: id });
      if (!result)
        res.status(404).json({
          status: 404,
          message: 'Không tìm thấy khóa học!',
        });
      else
        await CacheMiddleware.clearCache(`/api/course/detail-courses/${id}`);
        await CacheMiddleware.clearCache(`/api/course/all-courses`);
        res.status(200).json({
          status: 200,
          message: `Đã xóa khóa học id: ${result._id}`,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          status: 400,
          message: 'ID không hợp lệ!',
        });
      }

      const result = await CourseService.updateCourse(id, req.body);
      await CacheMiddleware.clearCache(`/api/course/detail-courses/${id}`);
      await CacheMiddleware.updateCache(`/api/course/detail-courses/${id}`, result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();

import Post from '../models/post.model.js';
import { BlogService } from '../services/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';

class BlogController {
  // Get all posts for users
  async index(req, res) {
    try {
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : null;
      const filterArray = filter ? filter.split(':') : null;
      const result = await BlogService.getAllPosts(limitValue, pageValue, sortArray, filterArray);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all posts for admin
  async adminIndex(req, res) {
    try {
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : null;
      const filterArray = filter ? filter.split(':') : null;
      const result = await BlogService.getAllPosts(limitValue, pageValue, sortArray, filterArray, true);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get post detail
  async get(req, res) {
    try {
      const { slug } = req.params;
      if (!slug)
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin ',
        });
      const result = await BlogService.getDetaiPost(slug);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add post
  async add(req, res) {
    try {
      // Call the service method to create the post
      const result = await BlogService.createPost(req);
      // Send the result back to the client
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete post
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin ',
        });
      if (!mongoose.isValidObjectId(id)) {
        return res.json({ status: 'ERR', message: 'ID không hợp lệ!' });
      }
      const result = await Post.findById(id);
      if (!result)
        res.status(404).json({
          status: 404,
          message: 'Không tìm thấy bài đăng!',
        });
      else if (req.user.id === result.userId || req.user.isAdmin) {
        await result.deleteOne();
        res.status(200).json({
          status: 200,
          message: `Đã xóa bài đăng id: ${result._id}`,
        });
      } else
        res.status(403).json({
          status: 'ERR',
          message: 'Bạn không có quyền xóa bài đăng này',
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update post
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          status: 400,
          message: 'ID không hợp lệ!',
        });
      }

      if (req.user.id !== req.body.userId)
        return res.status(403).json({
          status: 'ERR',
          message: 'Bạn không có quyền cập nhật bài đăng này',
        });
      const result = await BlogService.updatePost(id, req.body);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Confirm post
  async confirmPost(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          status: 400,
          message: 'ID không hợp lệ!',
        });
      }
      const result = await BlogService.confirmPost(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new BlogController();

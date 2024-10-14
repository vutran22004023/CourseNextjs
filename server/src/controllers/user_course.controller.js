import { UserCourseService } from '../services/index.js';

class UserCourseController {
  // Start user-course
  async startUserCourse(req, res) {
    try {
      const result = await UserCourseService.startUserCourse(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update progress
  async updateProgress(req, res) {
    try {
      const result = await UserCourseService.updateProgress(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course progress
  async getCourseProgress(req, res) {
    try {
      const result = await UserCourseService.getCourseProgress(req.user);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add, update or delete note
  async updateNote(req, res) {
    try {
      const data = { userId: req.user.id, ...req.body };
      const result = await UserCourseService.updateNote(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createNote(req, res) {
    try {
      const data = { userId: req.user.id, ...req.body };
      const result = await UserCourseService.createNote(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllNotes(req, res) {
    try {
      const data = { userId: req.user.id, ...req.body };
      const result = await UserCourseService.getAllNotes(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserCourseController();

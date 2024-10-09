import { NotificationService } from '../services/index.js';

class NotificationController {
  // Send notification
  async send(req, res) {
    try {
      const result = await NotificationService.send(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get notifications - dashboard
  async index(req, res) {
    try {
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : ['desc', 'createdAt'];
      const filterArray = filter ? filter.split(':') : null;
      const result = await NotificationService.get(limitValue, pageValue, sortArray, filterArray);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get notifications for modal
  async get(req, res) {
    try {
      const limitValue = 10;
      const pageValue = 0;
      const sortArray = ['desc', 'createdAt'];
      const filterArray = null;
      const result = await NotificationService.get(limitValue, pageValue, sortArray, filterArray);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete notification by id
  async delete(req, res) {
    try {
      const result = await NotificationService.delete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete all notifications
  async deleteAll(req, res) {
    try {
      const result = await NotificationService.deleteAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new NotificationController();

import { UserService } from '../services/index.js';

class UserController {
  async getAllUsers(req, res) {
    try {
      //GET /api/users?limit=10&page=0&sort=asc:name&filter=name:John
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : null;
      const filterArray = filter ? filter.split(':') : null;
      const response = await UserService.getAllUsers(limitValue, pageValue, sortArray, filterArray);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
      });
    }
  }

  async getDetailUser(req, res) {
    try {
      const userid = req.params.id;
      if (!userid) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa truyền id',
        });
      }
      const response = await UserService.getDetailUser(userid);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const userid = req.params.id;
      const data = req.body;
      const isAdmin = req.user.isAdmin;
      if (!userid) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa truyền id',
        });
      }
      const response = await UserService.updateUser(userid, data, isAdmin);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const userid = req.params.id;
      if (!userid) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa truyền id',
        });
      }
      const response = await UserService.deleteUser(userid);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
      });
    }
  }

  async deleteManyUser(req, res) {
    try {
      const userids = req.body.id;
      if (!userids) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa truyền id',
        });
      }
      const response = await UserService.deleteManyUser(userids);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: err,
      });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isCheckEmail = mailformat.test(email);
      if (!name || !email || !password) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin',
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Email nhập chưa đúng',
        });
      }

      const response = await UserService.createUser(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }
}

export default new UserController();

import Post from '../../models/post.model.js';
import 'dotenv/config';

class BlogService {
  async getAllPosts(limit, page, sort, filter, isAdmin = false) {
    const totalPosts = await Post.countDocuments();
    const query = {};
    const options = {
      limit: limit,
      skip: page * limit,
    };
    if (filter) {
      query[filter[0]] = { $regex: filter[1], $options: 'i' };
    }
    if (sort) {
      options.sort = { [sort[1]]: sort[0] };
    }
    if (!isAdmin) {
      query.isConfirmed = true;
    }
    const allPosts = await Post.find(query, null, options).populate('userId', 'name avatar isAdmin').lean();

    return {
      status: 200,
      message: 'Xem tất cả bài đăng',
      data: allPosts,
      total: totalPosts,
      pageCurrent: Number(page),
      totalPage: Math.ceil(totalPosts / limit),
    };
  }

  async getDetaiPost(slug) {
    const checkPost = await Post.findOne({ slug: slug }).populate('userId', 'name avatar isAdmin').lean();
    if (!checkPost) {
      return {
        status: 'ERR',
        message: 'Bài đăng không tồn tại',
      };
    }
    return {
      status: 200,
      data: checkPost,
      message: 'Show dữ liệu thành công',
    };
  }

  async createPost(req) {
    try {
      this.dataHandle(req.body);
      const { title, content, tag = null } = req.body;

      // Create the new post
      const createPost = await Post.create({ userId: req.user.id, title, content, tag });
      return {
        status: 200,
        data: createPost,
        message: 'Đã tạo bài đăng thành công',
      };
    } catch (err) {
      const error = this.validator(err);
      if (error) return error;
      throw err;
    }
  }

  async updatePost(postId, data) {
    try {
      this.dataHandle(data);
      const { title, content, tag = null } = data;
      const post = await Post.findOneAndUpdate({ _id: postId }, { title, content, tag }, { new: true }).lean();
      if (!post) {
        return {
          status: 'ERR',
          message: 'Không tìm thấy bài đăng!',
        };
      }
      return {
        status: 200,
        message: `Đã cập nhật bài đăng id: ${post._id}`,
        data: post,
      };
    } catch (err) {
      const error = this.validator(err);
      if (error) return error;
      throw err;
    }
  }

  async confirmPost(postId, data) {
    try {
      const { isConfirmed } = data;
      const post = await Post.findOneAndUpdate({ _id: postId }, { isConfirmed }, { new: true }).lean();
      if (!post) {
        return {
          status: 'ERR',
          message: 'Không tìm thấy bài đăng!',
        };
      }
      return {
        status: 200,
        message: `Đã cập nhật bài đăng id: ${post._id}`,
        data: post,
      };
    } catch (err) {
      const error = this.validator(err);
      if (error) return error;
      throw err;
    }
  }

  dataHandle(data) {
    // Trim data
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });
  }

  validator(err) {
    if (err.name === 'ValidationError') {
      const field = Object.keys(err.errors)[0];
      const error = err.errors[field];
      return {
        status: 'ERR',
        message: error.message,
      };
    } else if (err.code == 11000) {
      let key = Object.keys(err.keyValue)[0];
      return {
        status: 'ERR',
        message: `Đã có slug "${err.keyValue[key]}"`,
      };
    } else return 0;
  }
}

export default new BlogService();

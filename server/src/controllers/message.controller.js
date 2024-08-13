import CourseChat from '../models/message.model.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

class MessageController {
  async postMessage(req, res) {
    const { courseId, chapterId, videoId, userId, name, avatar, text } = req.body;

    try {
      let courseChat = await CourseChat.findOne({ courseId });

      if (!courseChat) {
        courseChat = new CourseChat({ courseId, chapters: [] });
      }

      let chapter = courseChat.chapters.find((ch) => ch.chapterId.toString() === chapterId);

      if (!chapter) {
        chapter = { chapterId, videos: [] };
        courseChat.chapters.push(chapter);
      }

      let videoChat = chapter.videos.find((vid) => vid.videoId.toString() === videoId);

      if (!videoChat) {
        videoChat = { videoId, messages: [] };
        chapter.videos.push(videoChat);
      }

      const newMessage = { userId, name, avatar, text, timestamp: new Date() };
      videoChat.messages.push(newMessage);

      await courseChat.save();

      res.status(201).json({ message: 'Message posted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while posting the message.' });
    }
  }

  async getMessages(req, res) {
    const { courseId, chapterId, videoId, page = 1, limit = 10 } = req.query;

    try {
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
        return res.status(400).json({ error: 'Invalid page or limit value.' });
      }

      const courseChat = await CourseChat.findOne({ courseId });

      if (!courseChat) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const chapter = courseChat.chapters.find((ch) => ch.chapterId.toString() === chapterId);

      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      const videoChat = chapter.videos.find((vid) => vid.videoId.toString() === videoId);

      if (!videoChat) {
        return res.status(404).json({ error: 'Video not found' });
      }

      const sortedMessages = videoChat.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const totalMessages = sortedMessages.length;
      const totalPages = Math.ceil(totalMessages / pageSize);
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      if (startIndex >= totalMessages) {
        return res.status(404).json({ error: 'Page not found' });
      }

      const messages = sortedMessages.slice(startIndex, endIndex);

      res.status(200).json({
        page: pageNumber,
        totalPages,
        totalMessages,
        messages,
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
  }

  async updateMessage(req, res) {
    const { courseId, chapterId, videoId, messageId } = req.params;
    const { userId, text } = req.body;

    try {
      const courseChat = await CourseChat.findOne({ courseId });

      if (!courseChat) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const chapter = courseChat.chapters.find((ch) => ch.chapterId.toString() === chapterId);

      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      const videoChat = chapter.videos.find((vid) => vid.videoId.toString() === videoId);

      if (!videoChat) {
        return res.status(404).json({ error: 'Video not found' });
      }

      const message = videoChat.messages.find((msg) => msg._id.toString() === messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      if (message.userId.toString() !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this message.' });
      }

      message.text = text;
      message.timestamp = new Date();

      await courseChat.save();

      res.status(200).json({ message: 'Message updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the message.' });
    }
  }

  async deleteMessage(req, res) {
    const { courseId, chapterId, videoId, messageId } = req.params;
    const { userId } = req.body;

    try {
      const courseChat = await CourseChat.findOne({ courseId });

      if (!courseChat) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const chapter = courseChat.chapters.find((ch) => ch.chapterId.toString() === chapterId);

      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      const videoChat = chapter.videos.find((vid) => vid.videoId.toString() === videoId);

      if (!videoChat) {
        return res.status(404).json({ error: 'Video not found' });
      }

      const messageIndex = videoChat.messages.findIndex((msg) => msg._id.toString() === messageId);

      if (messageIndex === -1) {
        return res.status(404).json({ error: 'Message not found' });
      }

      const message = videoChat.messages[messageIndex];

      if (message.userId.toString() !== userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this message.' });
      }

      videoChat.messages.splice(messageIndex, 1);

      await courseChat.save();

      res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the message.' });
    }
  }
}

export default new MessageController();

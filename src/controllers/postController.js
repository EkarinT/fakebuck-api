const fs = require('fs');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const { Post, User, Like, Comment } = require('../models');
const postService = require('../services/postService');

exports.createPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    if ((!title || !title.trim()) && !req.file) {
      throw new AppError('title or image is required', 400);
    }

    const data = { userId: req.user.id };
    if (title && title.trim()) {
      data.title = title;
    }

    if (req.file) {
      data.image = await cloudinary.upload(req.file.path);
    }

    const newPost = await Post.create(data);
    const post = await Post.findOne({
      where: { id: newPost.id },
      attributes: { exclude: 'userId' },
      include: [
        { model: User, attributes: { exclude: 'password' } },
        Like,
        Comment
      ]
    });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const { include } = req.query;
    const id = +req.params.id;
    const posts = await postService.findUserPosts(id, include);
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

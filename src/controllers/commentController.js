const AppError = require('../utils/appError');

exports.createComment = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    }

    
  } catch (err) {
    next(err);
  }
};

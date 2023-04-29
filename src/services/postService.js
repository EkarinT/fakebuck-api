const friendService = require('./friendService');
const { User, Post, Like, Comment } = require('../models');

exports.findUserPosts = async (userId, include) => {
  let whereUserId = userId;

  if (include === 'friend') {
    const friendIds = await friendService.findUserFriendIdsByuserId(userId);
    whereUserId = [userId, ...friendIds];
  }

  const posts = await Post.findAll({
    where: { userId: whereUserId },
    attributes: { exclude: 'userId' },
    include: [
      { model: User, attributes: { exclude: 'password' } },
      { model: Like },
      {
        model: Comment,
        attributes: { exclude: 'userId' },
        include: { model: User, attributes: { exclude: 'password' } }
      }
    ],
    order: [['updatedAt', 'DESC']]
  });
  return posts;
};

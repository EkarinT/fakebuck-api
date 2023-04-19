const { Op } = require('sequelize');
const { Friend } = require('../models');
const AppError = require('../utils/appError');
const { FRIEND_PENDING, FRIEND_ACCEPTED } = require('../config/constants');

exports.deleteFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;

    await Friend.destroy({
      where: {
        [Op.or]: [
          { requesterId: req.user.id, accepter: friendId },
          { requesterId: friendId, accepter: req.user.id }
        ]
      }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.createFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const existFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          { requesterId: req.user.id, accepterId: friendId },
          { requesterId: friendId, accepterId: req.user.id }
        ]
      }
    });

    if (existFriend) {
      throw new AppError('already friend or pending', 400);
    }

    await Friend.create({
      status: FRIEND_PENDING,
      requesterId: req.user.id,
      accepterId: friendId
    });

    res.status(200).json({ message: 'success request friend' });
  } catch (err) {
    next(err);
  }
};

exports.updateFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    await Friend.update(
      { status: FRIEND_ACCEPTED },
      {
        where: {
          status: FRIEND_PENDING,
          requesterId: friendId,
          accepterId: req.user.id
        }
      }
    );
    res.status(200).json({ message: 'success add friend' });
  } catch (err) {
    next(err);
  }
};

const { Op } = require('sequelize');
const {
  FRIEND_ACCEPTED,
  FRIEND_STATUS_ANNONYMOUS,
  FRIEND_STATUS_FRIEND,
  FRIEND_STATUS_REQUESTER,
  FRIEND_STATUS_ACCEPTER,
  FRIEND_STATUS_ME
} = require('../config/constants');
const { Friend, User } = require('../models');

exports.findUserFriendByUserId = async id => {
  const friends = await Friend.findAll({
    where: {
      status: FRIEND_ACCEPTED,
      [Op.or]: [{ requesterId: id }, { accepterId: id }]
    }
  });

  const friendIds = friends.map(item =>
    item.requesterId === id ? item.accepterId : item.requesterId
  );

  return await User.findAll({
    where: { id: friendIds },
    attributes: { exclude: 'password' }
  });

  // friendIds;
};

exports.findStatusWithMe = async (myId, userId) => {
  if (myId === +userId) {
    return FRIEND_STATUS_ME;
  }
  const friend = await Friend.findOne({
    where: {
      [Op.or]: [
        { requesterId: myId, accepterId: userId },
        { requesterId: userId, accepterId: myId }
      ]
    }
  });

  if (!friend) {
    return FRIEND_STATUS_ANNONYMOUS;
  }

  if (friend.status === FRIEND_ACCEPTED) {
    return FRIEND_STATUS_FRIEND;
  }

  if (friend.requesterId === myId) {
    return FRIEND_STATUS_REQUESTER;
  }
  return FRIEND_STATUS_ACCEPTER;
};

const { FRIEND_ACCEPTED, FRIEND_PENDING } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    'Friend',
    {
      title: {
        type: DataTypes.ENUM(FRIEND_ACCEPTED, FRIEND_PENDING),
        allowNull: false,
        defaultValue: FRIEND_PENDING
      }
    },
    { underscored: true }
  );

  return Friend;
};

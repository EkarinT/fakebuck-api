module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {}, { underscored: true });

  Like.associate = (db) => {
    Like.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  Like.associate = (db) => {
    Like.belongsTo(db.Comment, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };
  return Like;
};

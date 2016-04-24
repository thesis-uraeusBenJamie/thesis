module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userTwitter', {
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    screenName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'userTwitter',
    freezeTableName: true
  });
};
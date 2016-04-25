// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('facebook', {
//     idUser: {
// 	  type: DataTypes.STRING,
// 	  allowNull: false,
// 	  primaryKey: true,
// 	  autoIncrement: true
// 	},
// 	idFacebook: {
// 	  type: DataTypes.STRING,
// 	  allowNull: false
// 	},
// 	name: {
// 	  type: DataTypes.STRING,
// 	  allowNull: false
// 	},
//     email: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//       primaryKey: true
//     },
//     token: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     tableName: 'facebook',
//     freezeTableName: true,
//     timestamps: false
//   });
// };
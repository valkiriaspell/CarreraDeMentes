const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('game', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		Players: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		dificulty: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rounds: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		chat: {
			type: DataTypes.ARRAY(DataTypes.JSON), //chat
		},
	});
};

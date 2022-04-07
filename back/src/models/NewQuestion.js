const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('newQuestion', {
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			// validate: {
			// 	is: /^\¿.*?\?$/i,
			// }
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		false1: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		false2: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		false3: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
};
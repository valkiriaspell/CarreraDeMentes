const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('question', {
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
			}
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			// validate: {
			// 	is: /^\¿.*?\?$/i,
			// }
		},
		imageUrl: {
			type: DataTypes.TEXT,
			validate: {
				isUrl: true,
			}
		},
		correct: {
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
	});
};

const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('question', {
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageUrl: {
			type: DataTypes.TEXT,
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

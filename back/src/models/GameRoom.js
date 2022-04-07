const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('gameRoom', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 12],
			}
		},
		usersAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 6,
			validate: {
				isInt: true,
			}
		},
		questionAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
			validate: {
				isInt: true,
			}
		},
		public_: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		time: {
			type: DataTypes.INTEGER,
			defaultValue: 25,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Ninguna",
		},
	},
		{ timestamps: false });
};

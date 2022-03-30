const {DataTypes} = require('sequelize');

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
				isAlpha: true,
				len: [2,12], 
			}
		},
		usersAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		},
		questionAmout: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		},
		public_: {
			type: DataTypes.BOOLEAN,
		},
	});
};

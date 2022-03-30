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
		},
		usersAmount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		questionAmout: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		public_: {
			type: DataTypes.BOOLEAN,
		},
	});
};

const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('users', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		/*currentAvatar: {
			//ID de avatar
			type: DataTypes.INTEGER,
		},
		avatarStock: {
			type: DataTypes.INTEGER,
		},
		coins: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		experiencePoints: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		wins: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		friendId: {
			//id de amigos
			type: DataTypes.INTEGER,
		},
		host: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		guest: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},*/
	});
};

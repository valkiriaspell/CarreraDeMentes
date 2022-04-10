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
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},

		avatarStock: {
			type: DataTypes.INTEGER,
			validate: {
				isInt: true,
			},
		},
		coins: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: true,
			},
		},
		experiencePoints: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				isInt: true,
				min: 0,
			},
		},
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				isInt: true,
			},
		},
		wins: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				isInt: true,
			},
		},
		friendId: {
			//Id de amigos
			type: DataTypes.INTEGER,
			validate: {
				isInt: true,
			},
		},
		host: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		guest: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		ready: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},

		admin: {
			type: DataTypes.STRING,
			defaultValue: 'normal',
		},
		banner: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		points: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	});
};

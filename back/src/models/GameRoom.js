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
		email:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		public_: {
			type: DataTypes.BOOLEAN,
		},
	},
    { timestamps: false });
};

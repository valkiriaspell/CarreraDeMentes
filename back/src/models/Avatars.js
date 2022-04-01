const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('avatar', {
		imageUrl: {
			type: DataTypes.TEXT,
		},
	});
};

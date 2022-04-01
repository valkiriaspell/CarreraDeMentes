const { Users } = require('../db');

const createUsers = async (
	{ name,
		email,
		currentAvatar,
		avatarStock,
		coins,
		experiencePoints,
		level,
		wins,
		friendId,
		host,
		guest }
) => {
	try {
		const newUser = await Users.findOrCreate(
			{
				where: { email },
				defaults: {
					name,
					email,
					currentAvatar,
					avatarStock,
					coins,
					experiencePoints,
					level,
					wins,
					friendId,
					host,
					guest,
				}
			});

		return newUser;
	} catch (error) {
		return error;
	}
};

const getUser = async (email) => {
	try {
		let userFound = await Users.findAll({ where: { email: email } });

		return userFound;
	} catch (error) {
		return error;
	}
};
const getUsers = async () => {
	try {
		let usersFound = await Users.findAll();

		return usersFound;
	} catch (error) {
		return error;
	}
};

module.exports = {
	createUsers,
	getUser,
	getUsers,
};

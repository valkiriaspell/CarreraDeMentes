const {Users} = require('../db');

const createUsers = async ({
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
}) => {
	try {
		const [newUser, bool] = await Users.findOrCreate({
			where: {email},
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
			},
		});
		console.log(newUser);
		return newUser;
	} catch (error) {
		return error;
	}
};
const createGuestUser = async () => {
	try {
		const guestUser = 100;
		const newUser = await Users.findOrCreate({
			defaults: {
				name: `User${guestUser}`,
				email: `UserGuest${guestUser}.user@gmail.com`,
				// currentAvatar, hay que ver que le ponemos
				// avatarStock,
				coins: 0,
				experiencePoints: 0,
				level: 0,
				wins: 0,
				host: false,
				guest: true,
			},
		});
		guestUser++;
		return newUser;
	} catch (error) {
		return error;
	}
};

const getUser = async (email) => {
	try {
		let userFound = await Users.findOne({where: {email: email}});

		return userFound;
	} catch (error) {
		return error;
	}
};
const getUsers = async () => {
	try {
		let userFound = await Users.findAll();

		return userFound;
	} catch (error) {
		return error;
	}
};
const deleteUser = async (id) => {
	try {
		const eliminado = await Users.destroy({where: {id: id}});

		return 'Usuario eliminado correctamente';
	} catch (e) {
		return e;
	}
};
const modifyUser = async (id, name, currentAvatar) => {
	try {
		const modifiedUser = await Users.update(
			{name: name, currentAvatar: currentAvatar},
			{where: {id: id}}
		);
		console.log(modifiedUser);
		return modifiedUser;
	} catch (e) {
		return e;
	}
};

module.exports = {
	createUsers,
	getUser,
	getUsers,
	deleteUser,
	createGuestUser,
	modifyUser,
};

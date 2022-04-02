const {Users, Avatars} = require('../db');

const createUsers = async ({
	name,
	email,
	idAvatar,
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
		newUser.addAvatars(idAvatar);

		const userRelated = Users.findOne({
			where: {email},
			include: Avatars,
		});
		return userRelated;
	} catch (error) {
		return error;
	}
};
let guestUser = 100;
const createGuestUser = async () => {
	try {
		guestUser++;
		console.log('entrando');

		const newUser = await Users.create({
			name: `User${guestUser}`,
			email: `UserGuest${guestUser}.user@gmail.com`,
			guest: true,
		});

		console.log(newUser);
		newUser.addAvatars(1);
		const userRelated = Users.findOne({
			where: {name: `User${guestUser}`},
			include: Avatars,
		});
		return userRelated;
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

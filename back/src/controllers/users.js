const {Users, Avatar} = require('../db');

const includesAvatar = {include: [{model: Avatar}]};
const msjError = (msj) => ({error: msj});

let guestUser = 100;

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
		bool && (await newUser.addAvatar(idAvatar));

		return await Users.findOne({where: {email}, ...includesAvatar});
	} catch (error) {
		return error;
	}
};

const createGuestUser = async () => {
	try {
		guestUser++;

		const newUser = await Users.create({
			name: `User${guestUser}`,
			email: `UserGuest${guestUser}.user@gmail.com`,
			guest: true,
		});

		await newUser.addAvatar(1);

		return await Users.findOne({
			where: {name: `User${guestUser}`},
			...includesAvatar,
		});
	} catch (error) {
		return error;
	}
};

const getUser = async (email) => {
	try {
		const userFound = await Users.findOne({where: {email}, ...includesAvatar});
		return !userFound ? msjError('El email no existe') : userFound;
	} catch (error) {
		return error;
	}
};
const getUsers = async () => {
	try {
		const userFound = await Users.findAll(includesAvatar);

		return !userFound.length
			? msjError('No hay ningun usuario en la base de dato')
			: userFound;
	} catch (error) {
		return error;
	}
};
const getReadyUser = async (id) => {
	try {
		const readyFound = await Users.findOne({where: {id}});


		let obj = {id: readyFound.id, host: readyFound.host};

		return obj;


	} catch (error) {
		return error;
	}
};
const putUserReady = async (id, bool) => {
	try {
		const readyFound = await Users.findOne({where: {id}});
		await readyFound.update({ready: bool}, {where: {id}});
		return 'Usuario modificado con exito';
	} catch (error) {
		return error;
	}
};
const deleteUser = async (id) => {
	try {
		const eliminado = await Users.destroy({where: {id}});

		return eliminado > 0
			? 'Usuario eliminado correctamente'
			: msjError('El usuario no existe');
	} catch (e) {
		return e;
	}
};
const modifyUser = async ({id, name, idAvatar}) => {
	try {
		const userId = async () => await Users.findByPk(id, {...includesAvatar});

		const user = await userId();
		const newAvatar = await Avatar.findByPk(idAvatar);

		if (!user) return msjError('Usuario no encontrado');
		if (!newAvatar)
			return msjError('El avatar no fue encontrado en la base de datos');
		if (user.guest)
			return msjError('Lo siento, los invitados no pueden cambiar de avatar');

		await user.removeAvatar(user.avatars[0].id);
		await user.addAvatar(idAvatar);
		//agregue validacion para cambio de nombre si es que me mandan un nombre, sino no... (valki)
		if (name !== '') {
			await user.update({name}, {where: {id}});
		}

		const data = await userId();

		return data;
	} catch (e) {
		return e;
	}
};

const modifyHost = async (email, host) => {
	try {
		const userHost = await Users.findOne({where: {email}});

		const userUpdated = await userHost.update({host: host}, {where: {email}});
		return userUpdated;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createUsers,
	getUser,
	getUsers,
	deleteUser,
	createGuestUser,
	modifyUser,
	modifyHost,
	getReadyUser,
	putUserReady,
};

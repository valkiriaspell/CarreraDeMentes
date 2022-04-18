const {Users, Avatar} = require('../db');

const includesAvatar = {include: [{model: Avatar}]};
const msjError = (msj) => ({error: msj});

let guestUser = 100;

// Crea un usuario y lo guarda en la DB
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
	admin,
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
				admin,
			},
		});
		bool && (await newUser.addAvatar(idAvatar));

		return await Users.findOne({where: {email}, ...includesAvatar});
	} catch (error) {
		return {Error: 'Error al crear un usuario:' + error};
	}
};

// Crea un usuario invitado y lo guarda en la DB
const createGuestUser = async () => {
	try {
		const allUsersGuest = await Users.findAll({
			where:{
				guest: true
			}
		})
		const newUser = await Users.create({
			name: `User${allUsersGuest.length + 101}`,
			email: `UserGuest1${allUsersGuest.length + 101}.user@gmail.com`,
			guest: true,
		});

		await newUser.addAvatar(1);

		return await Users.findOne({
			where: {name: `User${allUsersGuest.length + 101}`},
			...includesAvatar,
		});
	} catch (error) {
		return {Error: 'Error al crear un usuario como invitado:' + error};
	}
};

// Trae un usuario desde la DB
const getUser = async (email) => {
	try {
		const userFound = await Users.findOne({where: {email}, ...includesAvatar});
		return !userFound ? msjError('El email no existe') : userFound;
	} catch (error) {
		return {Error: 'Error al devolver un usuario:' + error};
	}
};

// Trae todos los usuarios desde la DB
const getUsers = async () => {
	try {
		const userFound = await Users.findAll(includesAvatar);

		return !userFound.length
			? msjError('No hay ningun usuario en la base de dato')
			: userFound;
	} catch (error) {
		return {Error: 'Error al devolver los usuarios:' + error};
	}
};

// Busca el usuario que este listo para jugar
const getReadyUser = async (id) => {
	try {
		const readyFound = await Users.findOne({where: {id}});

		let obj = {id: readyFound.id, ready: readyFound.ready};

		return obj;
	} catch (error) {
		return {Error: 'Error al definir usuario como listo:' + error};
	};
};

// Actualiza al usuario para que este listo
const putUserReady = async (id, bool) => {
	try {
		const readyFound = await Users.findOne({where: {id}});
		await readyFound.update({ready: bool}, {where: {id}});
		return 'Usuario modificado con exito';
	} catch (error) {
		return {Error: 'Error al actualizar un usuario como listo:' + error};
	}
};

// Elimina el usuario de la DB
const deleteUser = async (id) => {
	try {
		const eliminado = await Users.destroy({where: {id}});

		return eliminado > 0
			? 'Usuario eliminado correctamente'
			: msjError('El usuario no existe');
	} catch (e) {
		return {Error: 'Error al eliminar un usuario:' + error};
	}
};

// Modifica los datos del usuario
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
		
		if (name !== '') {
			await user.update({name}, {where: {id}});
		}

		const data = await userId();

		return data;
	} catch (e) {
		return {Error: 'Error al modificar los datos del usuario:' + error};
	}
};

// Setea al usuario como host
const modifyHost = async (id, email, host) => {
	try {
		if (email) {
			const userUpdated = await Users.update({host: host}, {where: {email}});
			return userUpdated;
		}
		if (id) {
			console.log('llego');
			const userUpdated = await Users.update({host: host}, {where: {id}});
			return userUpdated;
		}
	} catch (error) {
		return {Error: 'Error al setear un usuario como host:' + error};
	}
};

// Setear al usuario como admin
const modifyAdmin = async (email, admin) => {
	try {
		const userAdmin = await Users.findOne({where: {email}});

		const userUpdated = await userAdmin.update(
			{admin: admin},
			{where: {email}}
		);
		return userUpdated;
	} catch (error) {
		return {Error: 'Error al setear un usuario como admin:' + error}
	}
};

// Bannear un usario
const bannerUser = async (email) => {
	try {
		const banneado = await Users.findOne({where: {email}});

		const updateBanneado = await banneado.update(
			{banner: !banneado.banner},
			{where: {email}}
		);
		return updateBanneado;
	} catch (error) {
		return {Error: 'Error al bannear un usuario:' + error}
	}
};

// Calcula el nivel del usuario y las coins ganadas en el juego segun los puntos de experiencia
const experience = async (id, winner) => {
	try {
		if (winner === 'true') {
			const userExperience = await Users.findOne({where: {id}});
			let currentLevel = userExperience.level;
			let levelUp = 500 * (1.5 * (currentLevel + 1));

			if (userExperience.experiencePoints + 100 >= levelUp) {
				currentLevel = currentLevel + 1;
			}
			console.log('este es el console log', levelUp);

			const modifiedExperience = await userExperience.update({
				experiencePoints: userExperience.experiencePoints + 100,
				coins: userExperience.coins + 10,
				wins: userExperience.wins + 1,
				level: currentLevel,
			});

			return modifiedExperience;
		} else {
			const userExperience = await Users.findOne({where: {id}});

			let currentLevel = userExperience.level;
			let levelUp = 500 * (1.5 * (currentLevel + 1));
			if (userExperience.experiencePoints + 50 >= levelUp) {
				currentLevel = currentLevel + 1;
			}

			const modifiedExperience = await userExperience.update({
				experiencePoints: userExperience.experiencePoints + 50,
				coins: userExperience.coins + 5,
				level: currentLevel,
			});
			return modifiedExperience;
		}
	} catch (error) {
		return {Error: 'Error al calcular nivel de experiencia del usuario:' + error}
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
	bannerUser,
	modifyAdmin,
	experience,
};

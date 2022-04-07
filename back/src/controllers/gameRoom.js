const { GameRoom, Users, Question, Avatar } = require('../db.js');

// 1110

//buscar todas las salas
exports.seachAllBDGameRoom = async ({ idRoom: id }) => {
	try {
		if (id !== undefined) {
			const data = await GameRoom.findByPk(id, {
				include: [
					{
						model: Users,
						attributes: ['id', 'name', 'host'],
						include: [Avatar],
					},

					{
						model: Question,
					},
				],
			});
			return data.dataValues;
		} else {
			const data = await GameRoom.findAll({
				where: { public_: true },
				include: [
					{
						model: Users,
						attributes: ['id'],

					},
				],
				attributes: ["id", "name", "questionAmount", "usersAmount"]
			});

			return await data.map(({ dataValues }) => {
				const { users, ...dt } = dataValues;
				return {
					...dt,
					numberUsersInRoom: users.length,
				};
			});
		}
	} catch (e) {
		console.log('error:', e);
		return e;
	}
};

// Funcion para modificar la sala
exports.updateGameRoomConfig = async ({ idRoom: id, public_, questions: questionAmount, category = "Ninguna", time }) => {
	try {

		const dataGameRoom = await GameRoom.findByPk(id);

		if (!dataGameRoom) return [false, "No se a encontrado la sada"];

		if (category === "") category = "Ninguna";

		await dataGameRoom.update({
			public_,
			category,
			questionAmount,
			time
		});

		return [true, "Sala actualizada correctamente"];

	} catch (e) {
		return e
	}
}

// Creamos una nueva sala
exports.createBDGameRoom = async ({
	name,
	/* 	usersAmount,
		questionAmout,
		public_,
		email, */
	idUser,
	avatar
}) => {
	try {
		const data = await GameRoom.create({
			name,
			/* 			usersAmount,
						questionAmout,
						public_,
						email, */
		});
		await data.addUser(idUser);
		const avatars = [{ imageUrl: avatar }]
		data.dataValues.users = [{ id: idUser, name, avatars }];

		return [true, data.dataValues];
	} catch (e) {
		console.log('Error al crear la sala: ', e);
		return e;
	}
};

// actializamos y agregamos un nuevo usuario a la sala
exports.updateAddBDGameRoom = async ({ idGameRoom, idUser }) => {
	console.log('vamos mal', idGameRoom, idUser);
	try {
		console.log('id', idGameRoom, idUser);
		const data = await GameRoom.findByPk(idGameRoom, {
			include: [
				{
					model: Users,
					attributes: ['id', 'name'],
				},
			],
		});
		console.log('esta es la data', data);
		if (!data) return [false, 'Sale no encontrada'];

		const { users, usersAmount } = data;

		if (users.length < usersAmount) {
			await data.addUsers(idUser);
			return [true, idGameRoom];
		} else if (users.length >= usersAmount) {
			return [false, 'La sala ya esta llena'];
		}
	} catch (e) {
		console.log(e);
		return e;
	}
};

// Eliminar una sala por su id
exports.deletByIdGameRoom = async ({ id }) => {
	try {
		const eliminado = await GameRoom.destroy({ where: { id } });
		if (eliminado > 0) {
			return [true, 'Salas eliminada'];
		} else {
			return [false, 'No se encotro la sala a eliminar'];
		}
	} catch (e) {
		return e;
	}
};

// Eliminar un usuario de la sala
exports.updateDeleteBDGameRoom = async ({ idGameRoom, idUserDelet }) => {
	try {
		const data = await GameRoom.findByPk(idGameRoom, {
			include: [
				{
					model: Users,
					attributes: ['id'],
				},
			],
		});

		await data.removeUser(idUserDelet);
		return [true, 'Usuario eliminado'];
	} catch (e) {
		console.log('Error al eliminar un usuario: ', e);
		return e;
	}
};

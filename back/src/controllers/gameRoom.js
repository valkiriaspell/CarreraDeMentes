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


			const room = []
			await data.forEach(({ dataValues }) => {
				const { users, ...dt } = dataValues;
				(users.length <= 5) && room.push({ ...dt, numberUsersInRoom: users.length })

			});

			return room.sort(orederMinMaxLongUsers);

		}
	} catch (e) {
		console.log('error:', e);
		return e;
	}
};

// oredenar de menor a mayor por coins
const orederMinMaxLongUsers = (a, b) => {
	if (a.numberUsersInRoom > b.numberUsersInRoom) return 1;
	if (b.numberUsersInRoom > a.numberUsersInRoom) return -1;
	return 0;
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
	idUser: id,
	avatar
}) => {
	try {
		const data = await GameRoom.create({ name });
		await data.addUser(id);
		data.dataValues.users = [{ id, name, avatars: [{ imageUrl: avatar }] }];

		return [true, data.dataValues];
	} catch (e) {
		console.log('Error al crear la sala: ', e);
		return e;
	}
};

// actializamos y agregamos un nuevo usuario a la sala
exports.updateAddBDGameRoom = async ({ idGameRoom, idUser }) => {

	try {

		const data = await GameRoom.findByPk(idGameRoom, {
			include: [
				{
					model: Users,
					attributes: ['id', 'name'],
				},
			],
		});

		if (!data) return [false, 'Sale no encontrada'];

		const { users, usersAmount } = data;

		if (users.length < 7) {
			await data.addUsers(idUser);
			return [true, "Usuario agregado correctamente"];
		}
		return [false, 'La sala ya esta llena'];

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

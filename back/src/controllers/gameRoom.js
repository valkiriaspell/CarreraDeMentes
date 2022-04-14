const { GameRoom, Users, Question, Avatar } = require('../db.js');

// 1110


// Ordenar de menor a mayor por cantidad de jugadores
const orederMinMaxLongUsers = (a, b) => {
	if (a.numberUsersInRoom > b.numberUsersInRoom) return 1;
	if (b.numberUsersInRoom > a.numberUsersInRoom) return -1;
	return 0;
};

// Consultar por una sala en especifico
const searchByPkGameRoom = async (id) => {
	try {


		const data = await GameRoom.findByPk(id, {
			include: [
				{
					model: Users,
					attributes: ['id', 'name', 'host', 'points'],
					include: [Avatar],
				},

				{
					model: Question,
				},
			],
		});

		if (!data) return [false, "No se encontro la Sala"]

		return [true, data.dataValues];
	} catch (e) {
		return {error: 'Error al encontrar la sala por PK:' + e}
	}
}

// Consultar todas las salas que sean publicas y no esten iniciadas
const searchAllGameRoom = async () => {
	try {
		const data = await GameRoom.findAll({
			where: { public_: true },
			include: [
				{
					model: Users,
					attributes: ['id'],

				},
			],
			attributes: ["id", "name", "questionAmount", "usersAmount", "start"]
		});


		const room = []
		await data.forEach(({ dataValues }) => {
			const { users, start, ...dt } = dataValues;
			(users.length <= 5 && !start) && room.push({ ...dt, numberUsersInRoom: users.length })

		});

		return [true, room.sort(orederMinMaxLongUsers)];
	} catch (e) {
		return {error: 'Error al encontrar salas publicas:' + e}
	}
}



// Buscar salas
exports.seachAllBDGameRoom = async ({ idRoom: id }) => {
	try {
		return id ? await searchByPkGameRoom(id) : await searchAllGameRoom()
	} catch (e) {
		return {error: 'Error al encontrar una sala buscada por Id:' + e}
	}
};



// Funcion para modificar la sala
exports.updateGameRoomConfig = async ({ idRoom: id, public_, questions: questionAmount, category = "Ninguna", time }) => {
	try {

		const dataGameRoom = await GameRoom.findByPk(id);

		if (!dataGameRoom) return [false, "No se ha encontrado la sala para actualizarla"];

		if (category === "") category = "Ninguna";

		await dataGameRoom.update({
			public_,
			category,
			questionAmount,
			time
		});

		return [true, "Sala actualizada correctamente"];

	} catch (e) {
		return {error: 'Error al actualizar la sala:' + e}
	}
}

// Crear una nueva sala
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
		return {error: 'Error al crear la sala:' + e}
	}
};

// Actualizamos y agregamos un nuevo usuario a la sala
exports.updateAddBDGameRoom = async ({ idRoom, idUser }) => {

	try {

		const data = await GameRoom.findByPk(idRoom, {
			include: [
				{
					model: Users,
					attributes: ['id', 'name'],
				},
			],
		});

		if (!data) return [false, 'Sala no encontrada'];

		const { users, usersAmount } = data;

		if (users.length < 7) {
			await data.addUsers(idUser);
			return [true, "Usuario agregado correctamente"];
		}
		return [false, 'La sala ya esta llena'];

	} catch (e) {
		return {error: 'Error al agregar un usuario y actualizar la sala:' + e}
	}
};

// Eliminar una sala por su id
exports.deletByIdGameRoom = async ({ idRoom: id }) => {
	try {
		const eliminado = await GameRoom.destroy({ where: { id } });
		if (eliminado > 0) {
			return [true, 'Sala eliminada'];
		} else {
			return [false, 'No se encontro la sala a eliminar'];
		}
	} catch (e) {
		return {error: 'Error al eliminar la sala:' + e};
	}
};

// Eliminar un usuario de la sala
exports.updateDeleteBDGameRoom = async ({ idRoom, idUserDelet }) => {
	try {
		console.log('llegando', idRoom, idUserDelet)
		const data = await GameRoom.findByPk(idRoom, {
			include: [
				{
					model: Users,
					attributes: ['id'],
				},
			],
		});

		if (!data) return [false, "No se encontro la sala"]

		await data.removeUser(idUserDelet);
		console.log('jugador eliminado', data)
		return [true, 'Usuario eliminado'];
	} catch (e) {
		return {error: 'Error al eliminar un usuario:' + e}
	}
};

// Funcion para iniciar una partida
exports.startGameRoom = async ({ idRoom, start = true }) => {
	try {
		const data = await GameRoom.findByPk(idRoom, {
			include: [{
				model: Users,
				attributes: ["id"]
			}]
		});

		if (!data) return [false, "No existe la sala para iniciar la partida"];

		if (!start) {
			await data.update({ start });
			return [true, "La sala dejo de estar en juego"]

		}

		if ((data.dataValues.users.length && data.dataValues.users.length < 2) && start) return [false, "Tienen que ser minimo 2 jugadores para jugar"]

		await data.update({ start });

		return [true, "Sala iniciada"];


	} catch (e) {
		return {error: 'Error al intentar inicializar la sala para jugar:' + e}
	}
}

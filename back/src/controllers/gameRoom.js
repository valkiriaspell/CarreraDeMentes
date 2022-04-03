const {GameRoom, Users, Question} = require('../db.js');

//buscar todas las salas
exports.seachAllBDGameRoom = async (idRoom) => {
	try {
		if (idRoom !== undefined) {

			const data = await GameRoom.findOne({
				where: {id: idRoom},
				include: [
					{
						model: Users,
						attributes: ['id', 'name', 'host'],
					},
				],
			});
			return data.dataValues;
		} else {

			const data = await GameRoom.findAll({
				include: [
					{
						model: Users,
						attributes: ['id'],
					},
				],
			});
			const rooms = data.map(room => {
				return {
					id: room.dataValues.id,
					name: room.dataValues.name,
					questionAmount: room.dataValues.questionAmount,
					numberUsersInRoom: room.dataValues.users.length
				}
			})

			return rooms;
		}
	} catch (e) {
		console.log('error:', e);
		return e;
	}
};
/* exports.seachAllBDGameRoom = async () => {
    try {
        const data = await GameRoom.findAll({
            include: [
                {
                    model: Users,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Question
                }
            ]
        })

        return data
    } catch (e) {
        console.log("error:", e)
        return e
    }
} */

exports.createBDGameRoom = async ({
	name,
/* 	usersAmount,
	questionAmout,
	public_,
	email, */
	idUser,
	currentAvatar
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
		data.dataValues.users = [{idUser, name, currentAvatar}]

		return [true, data.dataValues];
	} catch (e) {
		console.log('Error al crear la sala: ', e);
		return e;
	}
};

// actializamos y agregamos un nuevo usuario a la sala
exports.updateAddBDGameRoom = async ({idGameRoom, idUser}) => {
console.log('vamos mal', idGameRoom, idUser)
	try {
		console.log('id', idGameRoom, idUser)
		const data = await GameRoom.findByPk(idGameRoom, {
			include: [
				{
					model: Users,
					attributes: ['id', 'name'],
				},
			],
		});
console.log("esta es la data", data)
		if (!data) return [false, 'Sale no encontrada'];

		const {users, usersAmount} = data;

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

            return [true, "Salas eliminada"]
        } else {
            return [false, "No se encotro la sala a eliminar"]
        }

    } catch (e) {
        return e
    }
}

// Eliminar un usuario de la sala
exports.updateDeleteBDGameRoom = async ({idGameRoom, idUserDelet}) => {
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

const {GameRoom, Users, Question} = require('../db.js');

//buscar todas las salas
exports.seachAllBDGameRoom = async () => {
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
}

exports.createBDGameRoom = async ({
	name,
/* 	usersAmount,
	questionAmout,
	public_,
	email, */
	idUser,
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
		const devolver = await GameRoom.findOne({ // cambiar por data.dataValues.users = [idUser, name]
			where: {id: data.dataValues.id},
			include: [
				{
					model: Users,
					attributes: ['id'],
				},
			],
		})
		return [true, devolver.dataValues];
	} catch (e) {
		console.log('Error al crear la sala: ', e);
		return e;
	}
};

// actializamos y agregamos un nuevo usuario a la sala
exports.updateAddBDGameRoom = async ({idGameRoom, idUser}) => {
	try {
		const data = await GameRoom.findByPk(idGameRoom, {
			include: [
				{
					model: Users,
					attributes: ['id'],
				},
			],
		});

		if (!data) return [false, 'Sale no encontrada'];

		const {users, usersAmount} = data;

		if (users.length < usersAmount) {
			await data.addUsers(idUser);
			return [true, 'Usuario agregado exitosamente'];
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

var express = require('express');
var router = express.Router();
module.exports = router;
const {
	createBDGameRoom,
	updateAddBDGameRoom,
	updateDeleteBDGameRoom,
	seachAllBDGameRoom,
	deletByIdGameRoom,
} = require('../controllers/gameRoom');
const {GameRoom, Question, Users, Chat, Avatar} = require('../db.js');

// escriban sus rutas acá

// Ruta para crear una nueva sala
router.post('/', async (req, res) => {
	try {
		const [bool, msj] = await createBDGameRoom(req.body);
		if (bool) {
			res.send(msj);
		}
		res.send('No se pudo crear la sala');
	} catch (e) {
		res.status(500).send('Error al crear una sala: ' + e);
	}
});

// Ruta para agregar un usuario a la Sala
router.put('/', async (req, res) => {
	try {
		const [bool, msj] = await updateAddBDGameRoom(req.body);
		if (bool) {
			res.send(msj);
		} else {
			res.send(msj);
		}
	} catch (e) {
		console.log('Error al agregar un Usuario a una sala:', e);
		res.status(500).send('Error al agregar un Usuario a una sala: ' + e);
	}
});

// Ruta para eliminar un usuario de la sala
router.put('/delete', async (req, res) => {
	try {
		const [bool, msj] = await updateDeleteBDGameRoom(req.body);
		if (bool) {
			res.send(msj);
		} else {
			res.send(msj);
		}
	} catch (e) {
		res.status(500).send('Error al eliminar un usuario de la sala: ' + e);
	}
});
// Ruta para eliminar una sala
router.delete('/:id', async (req, res) => {
	try {
		const [bool, msj] = await deletByIdGameRoom(req.params);
		if (bool) {
			res.send(msj);
		} else {
			res.send(msj);
		}
	} catch (e) {
		res.status(500).send('Error al eliminar una sala: ' + e);
	}
});

// Ruta para obtener todas las salas
router.get('/', async (req, res) => {
	try {
		const {idRoom} = req.query;

		const data = await seachAllBDGameRoom(idRoom);
		res.send(data);
	} catch (e) {
		res.status(500).send('Error al buscar una sala: ' + e);
	}
});

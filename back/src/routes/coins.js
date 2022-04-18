const express = require('express');
const router = express.Router();
module.exports = router;

const {
	addMultCoins,
	addInitServerMultCoins,
	getAllMinMaxCoins,
	updateCoins,
	deleteCoins,
	addCoins,
} = require('../controllers/coins');

// Buscar todas los coins
router.get('/', async (_req, res) => {
	try {
		const [bool, msj] = await getAllMinMaxCoins();

		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al buscar las coins: ' + e);
	}
});

// Agrega una nueva coin
router.post('/', async (req, res) => {
	try {
		const [bool, msj] = await addCoins(req.body);
		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al agregar una coin: ' + e);
	}
});

// Agregar multiples coins
router.post('/multiplesCoins', async (req, res) => {
	try {
		const [bool, msj] = await addMultCoins(req.body);
		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al agregar multiples coins: ' + e);
	}
});

// Agregar nuevas coins al iniciar el servidor
router.get('/multiplesCoins', async (req, res) => {
	try {
		const [bool, msj] = await addInitServerMultCoins();
		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al agregar coins al iniciar el server: ' + e);
	}
});

// Modificar coins
router.put('/', async (req, res) => {
	try {
		const [bool, msj] = await updateCoins(req.body);

		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al actualizar coins: ' + e);
	}
});

// Eliminar una coin
router.delete('/', async (req, res) => {
	try {
		const [bool, msj] = await deleteCoins(req.body);

		res.send(msj);
	} catch (e) {
		res.status(500).send('Error al eliminar una coin: ' + e);
	}
});

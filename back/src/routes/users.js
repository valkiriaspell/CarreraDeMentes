const {Router} = require('express');
const router = Router();
module.exports = router;
const {
	createUsers,
	getUser,
	getUsers,
	modifyUser,
	modifyHost,
	createGuestUser,
	getReadyUser,
	putUserReady
} = require('../controllers/users');

// escriban sus rutas acá
router.get('/', async (req, res) => {
	try {
		const {email} = req.query;
		if (email) {
			const userFound = await getUser(email);
			res.json(userFound);
		} else {
			const userAll = await getUsers();
			if (!userAll) {
				res.json('No se encontro ningun usuario en la base de datos');
			} else {
				res.json(userAll);
			}
		}
	} catch (e) {
		res.status(500).send('Error: ' + e);
	}
});

router.get('/ready', async (req, res) => {
	try {
		const {id} = req.query;
		const userReady = await getReadyUser(id);
		res.json(userReady);
	} catch (e) {
		res.status(500).send('Error: ' + e);
	}
});
router.put('/ready', async (req, res) => {
	try {
		const {id, bool} = req.query;

		const userReady = await putUserReady(id, bool);
		res.send(userReady);
	} catch (e) {
		res.status(500).send('Error al modificar usuario: ' + e);
	}
});

router.post('/', async (req, res) => {
	console.log(req.body.guest);
	try {
		const {guest} = req.body;
		if (guest === true) {
			const guestUser = await createGuestUser();
			res.send(guestUser);
		} else {
			const userCreated = await createUsers(req.body);
			if (!userCreated) {
				res.send('Problemas en el servidor no pudo ser creado');
			} else {
				console.log(userCreated);
				res.send(userCreated);
			}
		}
	} catch (e) {
		res.status(500).send('Error: ' + e);
	}
});
router.delete('/', async (req, res) => {
	try {
		const {id} = req.query;
		const userDeleted = await deleteUser(id);
		res.send(userDeleted);
	} catch (e) {
		res.status(500).send('Error al eliminar usuario: ' + e);
	}
});
router.put('/', async (req, res) => {
	try {
		const {email, host} = req.query;
		if (email) {
			const hostFound = await modifyHost(email, host);
			res.send(hostFound);
		} else {
			const userUpdated = await modifyUser(req.body);
			console.log(userUpdated);
			res.send(userUpdated);
		}
	} catch (e) {
		res.status(500).send('Error al modificar usuario: ' + e);
	}
});

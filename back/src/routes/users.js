const {Router} = require('express');
const router = Router();
module.exports = router;
const {createUsers, getUser, getUsers} = require('../controllers/users');

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
router.post('/', async (req, res) => {
	try {
		const creado = await createUsers(req.body);
		if (!creado) {
			res.send('Problemas en el servidor no pudo ser creado');
		} else {
			console.log(creado)
			res.send(creado);
		}
	} catch (e) {
		res.status(500).send('Error: ' + e);
	}
});

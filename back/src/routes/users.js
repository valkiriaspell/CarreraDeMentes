const {Router} = require('express');
const router = Router();
module.exports = router;
const {createUsers, getUser, getUsers} = require('../controllers/users');

// escriban sus rutas acá
router.get('/', async (req, res) => {
	try {

		const user = await getUsers(req.query);
		if (!user) {
			res.send('No se encontro ningun usuario en la base de datos');
		} else {
			res.send(user);
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

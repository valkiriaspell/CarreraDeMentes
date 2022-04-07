const express = require('express');
const { data, getQuestions } = require('../controllers/question');

const router = express.Router();
module.exports = router;


// escriban sus rutas acá

// Agregamos todos los datos predeterminados a nuestra base de datos
router.get('/', async (req, res) => {
	try {
		const result = await data();
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error al cargar las question a la tabla: " + error);
	}
});


// Vincilamos las tablas correspondientes con preguntas random
router.post('/allQuestions', async (req, res) => {
	try {
		const { count, category, idRoom } = req.body;
		const [bool, msj] = await getQuestions(count, category, idRoom);
		if (bool) {
			res.send(msj);
		} else {
			res.send(msj);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Error al agragar las questions: " + error);
	}
});

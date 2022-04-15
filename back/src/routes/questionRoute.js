const express = require('express');
const { data, getQuestions, updateQuestions } = require('../controllers/question');

const router = express.Router();
module.exports = router;


// escriban sus rutas acá

// Agregamos todos los datos predeterminados a nuestra base de datos
// Traemos todas las preguntas que hay en la DB (Originiales y Agregadas)
router.get('/', async (req, res) => {
	try {
		const result = await data();
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error al cargar las questions a la DB: " + error);
	}
});


// Vinculamos las tablas correspondientes con preguntas random
router.post('/allQuestions', async (req, res) => {
	try {
		console.log('queestions', req.body)
		const { count, category, idRoom } = req.body;
		const [bool, msj] = await getQuestions(count, category, idRoom);
		if (bool) {
			res.send(msj);
		} else {
			res.send(msj);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Error al agregar las questions a la GameRoom correspondiente: " + error);
	}
});

// Actualizamos una pregunta de nuestra DB
router.put('/', async (req, res) => {
	try {
		const { id, question, answer, false1, false2, false3, category, image } = req.body
		const modify = await updateQuestions(id, question, answer, false1, false2, false3, category, image)
		res.status(200).send(modify)
	} catch (error) {
		res.status(404).send(`Error al actualizar una pregunta: ${error}`)
	}
});
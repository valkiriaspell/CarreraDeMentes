var express = require('express');
const {data, getQuestions} = require('../controllers/question');

var router = express.Router();
module.exports = router;

// escriban sus rutas acá
router.get('/', async function (req, res) {
	try {
		const result = await data();
		res.json(result);
	} catch (error) {
		console.log(error);
	}
});
router.get('/allQuestions', async function (req, res) {
	const {count, category} = req.body;
	try {
		const result = await getQuestions(count, category);
		res.json(result);
	} catch (error) {
		console.log(error);
	}
});

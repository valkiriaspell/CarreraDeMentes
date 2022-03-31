var express = require('express');
const {data} = require('../controllers/question');
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

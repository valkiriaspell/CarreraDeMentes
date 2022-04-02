var express = require('express');
var router = express.Router();
const { getAvatars } = require ('../controllers/avatars.js');

// escriban sus rutas acá
router.get('/', async function (req, res) { 
    try {
        const avatar = await (getAvatars())
        res.status(200).json(avatar)

    } catch (error) {
        res.status(404).send(`No se puede encontrar el avatar: ${error}`)
    }
})

module.exports = router;
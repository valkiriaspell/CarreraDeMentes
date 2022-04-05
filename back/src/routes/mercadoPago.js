const { Router } = require('express');
const router = Router();
const { crearLinkPago, insertarCoinsUsuario } = require('../controllers/mercadoPago.js');

router.post('/create_preference', crearLinkPago)
// router.get('/', insertarCoinsUsuario)
router.post('/', insertarCoinsUsuario)

module.exports = router;
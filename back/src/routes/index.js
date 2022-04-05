const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const avatar = require('./avatarsRoute.js');
const newQuestion = require('./newQuestionRoute.js');
const gameRoom = require('./gameRoomRoute.js');
const question = require('./questionRoute.js');
const users = require('./users.js');
const coins = require('./coins.js')
const mercadoPago = require('./mercadoPago.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/avatar', avatar);
router.use('/newQuestion', newQuestion);
router.use('/gameRoom', gameRoom);
router.use('/question', question);
router.use('/users', users);
router.use('/coins', coins);
router.use('/mercadopago', mercadoPago)

module.exports = router;

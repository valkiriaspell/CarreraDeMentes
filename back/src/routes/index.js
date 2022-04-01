const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const avatar=require('./avatarsRoute.js')
const chat=require('./chatRoute.js')
const gameRoom=require('./gameRoomRoute.js')
const question=require('./questionRoute.js')
const users=require('./users.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/avatar',avatar)
router.use('/chat',chat)
router.use('/gameRoom',gameRoom)
router.use('/question',question)
router.use('/users',users)


module.exports = router;

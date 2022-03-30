const {Router} = require('express');
const router = Router();
const {createUsers, getUser, getUsers} = require('../controllers/users');

router.use('/', createUsers);

module.exports = router;

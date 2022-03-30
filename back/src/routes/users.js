<<<<<<< Updated upstream
var express = require('express');
var router = express.Router();
module.exports = router;
const {GameRoom, Question, Users, Chat, Avatar} = require('../db.js')

// escriban sus rutas acá
router.get('/',async function(req,res){ 
})
=======
const {Router} = require('express');
const router = Router();
const {createUsers, getUser, getUsers} = require('../controllers/users');

router.use('/', createUsers);

module.exports = router;
>>>>>>> Stashed changes

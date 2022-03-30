const express = require('express');
const router = express.Router();
const {createUsers, getUser, getUsers} = require('../controllers/users');

router.use('/', createUsers);

// escriban sus rutas acá
router.get("/", async(req, res)=>{
   
})
module.exports = router; 
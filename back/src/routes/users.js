var express = require('express');
var router = express.Router();
module.exports = router;
const {GameRoom, Question, Users, Chat, Avatar} = require('../db.js')

// escriban sus rutas acá
router.post('/',async function(req,res){ 
    
    const {name, email} = req.body;
    await Users.create({name, email});

    res.send("creado")

})

router.get("/", async(req, res)=>{
    const data = await Users.findAll();

    res.send(data);
})
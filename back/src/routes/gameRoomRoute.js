var express = require('express');
var router = express.Router();
module.exports = router;
const { createBDGameRoom, updateBDGameRoom } = require("../controllers/gameRoom"); 
const {GameRoom, Question, Users, Chat, Avatar } = require('../db.js')

// escriban sus rutas acá


router.post("/", async (req, res)=>{
    
    try{
        createBDGameRoom(req.body);
        res.send("creado");
    }catch(e){
        res.send("error: "+e);
    }
    
    
})

router.put("/", async (req, res)=>{
    
    try{
        updateBDGameRoom(req.body);
        res.send("actualizado");
    }catch(e){
        res.send("error: "+e);
    }
    
    
})

router.get("/", async (req, res)=>{
    
    try{
        const data = await GameRoom.findAll()
        res.send(data);
    }catch(e){
        res.send("error: "+e);
    }
    
    
})

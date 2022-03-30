const {Router} = require('express');
const router = Router();
module.exports = router;
const {createUsers, getUser, getUsers} = require('../controllers/users');

// escriban sus rutas acá
router.post("/", async(req, res)=>{    
    try{
        const creado = await createUsers(req.body)
        if(!creado){
            res.send("Problemas en el servidor no pudo ser creado")
        }else{

            res.send("Users Creado")
        }
    }catch(e){
        res.status(500).send("Error: "+e)
    }
})


router.get("/", async(req, res)=>{
    try{

        const userAll = await getUsers();
        if(!userAll){
                res.send("No se encontro ningun usuario en la base de datos")
        } else{
            res.send(userAll);
        
        }
    }catch(e){
        res.status(500).send("Error: "+e)
    }
})
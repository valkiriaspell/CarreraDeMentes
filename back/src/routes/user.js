var express = require('express');
var router = express.Router();
module.exports = router;
const { Users } = require('../db.js')


router.get('/login',function(req,res){
    if(!req.session.userId){
        res.json({status:'login',message:'no se encuentra registrado'})
    }else{
        res.json({status:true,message:'el usiario ya encuentra registrado'})
    }
})

router.get('/user',(req,res)=>{ 
    if(!req.session.userId){ 
        res.json({status:false,message:'usuario NO identificado'})
    }else{res.json({status:true,message:'el usiario ya encuentra registrado'})}
})

router.post('/login',async function(req,res){//localhost:3001/auth/
    const{email,password}=req.body;
    if(email&&password){
        const find=await Users.findOne({ 
            where:{email:email}
        })
        if(!find){res.json({status:false,message:'no user found with the email provided'})}
        else{
            if(find.password===password){
                req.session.userId=find.id;
                res.json({status:true,message:'usuario identificado'})
            }else{res.json({status:false,message:'Wrong password'})}            
        }
    }
    else{res.json({status:false,message:'falta informacion'})}
})

router.post('/register',async(req,res)=>{
    const{name,email,password}=req.body;
    if(name&&email&&password){
        const find=await Users.findOne({
            where:{email:email},
        })
        if(find){res.json({status:false,message:'the email belong to a register user, please use another one'})}
        else{
           const newUser=await Users.create({
                name,
                email,
                password
            })
            res.json({status:true,message:`user ${newUser.name} has been created`})
        }
    }else{resjson({status:false,message:'falta informacion'})}
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        if(err) {
          return res.json({status:false,message:'Logout no completado'})
        }
        res.clearCookie('sid');
        res.json({status:true,message:'Logout'})
      })
})

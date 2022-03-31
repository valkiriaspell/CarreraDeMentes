const { GameRoom, Users } = require("../db.js");

exports.createBDGameRoom = async({ name, usersAmount, questionAmout, public_, email, idUser })=>{
    try{
        

        const data = await GameRoom.create(
            { name,
             usersAmount,
             questionAmout,
             public_,
             email,
            })
            data.addUser(idUser)
        return data;
    }catch(e){
        console.log("Error al crear la sala: ", e);
        return e
    }
}

exports.updateBDGameRoom = async({idGameRoom, idUser})=>{
    
    const data = await GameRoom.findByPk(idGameRoom, {
        include:[{
            model: Users,
            attributes: ["email"]
        }]
    })

    if(data.usersAmount < 7){
        const newUser = await data.addUsers(idUser)
    }
}


exports.seachAllBDGameRoom = async()=>{
    try{

        const data = await GameRoom.findAll({
        include: [
            {
                model: Users,
                attributes: ["id", "name", "email"]
            }
    ]})
    
    return data
    }catch(e){
        return e
    }
}
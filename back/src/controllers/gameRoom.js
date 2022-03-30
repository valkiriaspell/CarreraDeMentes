const { GameRoom, Users } = require("../db.js");

exports.createBDGameRoom = async({ name, usersAmount, questionAmout, public_, email })=>{
    try{

        const data = await GameRoom.create({ name, usersAmount, questionAmout, public_ });
        console.log(GameRoom)
        data.addUsers({email})
    }catch(e){

    }
}

exports.updateBDGameRoom = async({idGameRoom, email})=>{
    
    const data = await GameRoom.findByAk(idGameRoom, {
        include:[{
            model: Users,
            attributes: ["email"]
        }]
    })

    if(data.usersAmount < 7){
        const newUser = await GameRoom.addUsers({email})
    }
}


exports.seachAllBDGameRoom = async()=>{
    const data = await GameRoom.findAll({
        include: [
            {
                model: Question,
                attributes: ["id", "question"]
            }
    ]})
}
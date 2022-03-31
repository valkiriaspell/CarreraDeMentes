const { GameRoom, Users, Question } = require("../db.js");


const questionRandom = async(usersAmount, skipCategory)=>{
    try{
        const question = []
        const questionDB = await Question.findAll();

        
        while (usersAmount >=1 ) {

            const random = getRandomInt(questionDB.length)
            if(!skipCategory){
                
                usersAmount--;
            }
            
        }


        return question;

    }catch(e){
        console.log("Error a consultar las preguntas random: ", e);
    }
}

// Obtenemos un numero random
function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
  }

exports.createQuestionGameRoom = async()=>{
    
}

exports.createBDGameRoom = async({ name, usersAmount, questionAmout, public_, email, idUser })=>{
    try{
        const question = await questionRandom(questionAmout);
        const data = await GameRoom.create(
            { name,
             usersAmount,
             questionAmout,
             public_,
             email,
            })
            data.addUser(idUser);
            data.addQuestion(question);
        return data;
    }catch(e){
        console.log("Error al crear la sala: ", e);
        return e
    }
}

exports.updateAddBDGameRoom = async({idGameRoom, idUser})=>{
    try{

    const data = await GameRoom.findByPk(idGameRoom,{
        include: [
            {
                model: Users,
                attributes: ["id"]
            }
    ]
    });

    const {users, usersAmount} = data;
        
    if(users.length < usersAmount){
        await data.addUsers(idUser)
        return true
    }else{
        return false;
    }
    }catch(e){
        return e
    }
}

//buscar todas las salas
exports.seachAllBDGameRoom = async()=>{
    try{
        const data = await GameRoom.findAll({
        include: [
            {
                model: Users,
                attributes: ["id", "name", "email"]
            },
            {
                model: Question,
                attributes: ["id", "question", "answer", "false1","false2", "false3", "category"]
            }
    ]})
    
    return data
    }catch(e){
        console.log("error:", e)
        return e
    }
}

// Eliminar una sala por su id
exports.deletByIdGameRoom = async({id})=>{
    try{

        const dt = await GameRoom.destroy({ where: { id} });
    }catch(e){
        return e
    }
}


exports.updateDeleteBDGameRoom = async({idGameRoom, idUser})=>{
    try{

    const data = await GameRoom.findByPk(idGameRoom,{
        include: [
            {
                model: Users,
                attributes: ["id"]
            }
    ]
    });

    const {users, usersAmount} = data;
        
    if(users.length < usersAmount){
        await data.addUsers(idUser)
        return true
    }else{
        return false;
    }
    }catch(e){
        return e
    }
}


class NodeQuestions{
    
    constructor(valueId, value){
        this.left = null;
        this.rigth = null;
        this.value = value;
        this.valueId = valueId; 
    }

    insert(valueId, value){
        const nodo = new NodeQuestions(valueId, value);
        if (value < this.value)
            this.left ? this.left.insert(valueId, value) : (this.left = nodo);
        else this.right ? this.right.insert(valueId, value) : (this.right = nodo);
    }


    contains(valueId) {
        if (this.valueId === valueId) return true;
        if (valueId < this.valueId)
          return this.left ? this.left.contains(valueId) : false;
        else return this.right ? this.right.contains(valueId) : false;
      }





}
var express = require('express');
const {  data } = require('../controllers/question.js');
var router = express.Router();
module.exports = router;
const {GameRoom, Question, Users, Chat, Avatar} = require('../db.js')


// escriban sus rutas acá
router.get('/',async function(req,res){ 
    const {count,category,idRoom}=req.body
    const questionNumbers=[]
    const questionList=[]
    const dbQuestions=await Question.findAll()
    for (let index = 0; index < count; index++) {
        var q;
        while (!questionNumbers.includes(q)) {
            q=Math.floor((Math.random()*dbQuestions.length)%(dbQuestions.length)) 
            if(dbQuestions[q].category!==category){
                questionNumbers.push(q)
                questionList.push(dbQuestions[q])
            }
        }                   
    }
    //a que room le agrego estas preguntas??
    const room=await GameRoom.findOne({
        where:{
            id:idRoom
        }
    })
    //room.setQuestions(questionNumber)
})
router.get('/questions',async(req,res)=>{
    try{
        const questions=await data()
        res.json(questions)
    }catch(e){
        res.status(400).send(e)

    }
})

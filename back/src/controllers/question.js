const { GameRoom, Question, Users, Chat, Avatar } = require('../db.js');
const question= require('../Questions.json')



// const loadQuestions = async () => {
//     try {

//         const infoQuestions=JSON.parse(JSON.stringify(question))
//         console.log(infoQuestions)
//         infoQuestions.map(a => {
//             Question.create({
//                 id:a.id,
//                 question:a.question,
//                 category:a.category,
//                 answer:a.answer,
//                 false1:a.false1,
//                 false2:a.false2,
//                 false3:a.false3,
//                 image:"no hay nada"
//             })
//         }) 
        function data(){
        const dt = JSON.parse(JSON.stringify(question));

                dt.forEach(elm =>{
                    const {id, ...elms} = elm;
                    Question.create({...elms});
                })
            }
        // const allQuestion = await Question.findAll()
        // return allQuestion
        // }
//     } catch (error) {
//         console.log('Question not found: ' + error)
//     }
// }

module.exports = {
    data
}
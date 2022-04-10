const { Question, NewQuestion } = require("../db");

const createNewQuestion = async (question, answer, false1, false2, false3, category, image, email) => {
    try {
        const info = await NewQuestion.create({
            question, 
            answer,
            false1,
            false2,
            false3,
            category,
            image,
            email
        })
        return info

    } catch(error){
        console.log(`La pregunta no pudo ser creada correctamente: ${error}`)
    }
}

const getNewQuestion = async () => {
    try {
        const infoNewQueation = await NewQuestion.findAll()
        return infoNewQueation

    } catch(error){
        console.log(`La pregunta solicitada no existe: ${error}`)
    }
}

const deleteNewQuestion = async (id) => {
    try {
        const removeNewQuestion = await NewQuestion.destroy({
            where: {
                id: id
        }})
        return removeNewQuestion

    } catch(error){
        console.log(`La pregunta no pudo ser eliminada: ${error}`)
    }
}

const aceptedNewQuestion = async (id) => {
    try {
        const listQuestions = await Question.findAll()
        const toAcept = await NewQuestion.findOne({
            where: {
                id: id
            }
        })
        toAcept.dataValues.id = listQuestions.length + 1
        listQuestions.push(toAcept)
        
        listQuestions.forEach(async (q) => {
			const { id } = q.dataValues;
			await Question.findOrCreate({
				where: { id },
				defaults: {           
                    question: q.dataValues.question, 
                    answer: q.dataValues.answer,
                    false1: q.dataValues.false1,
                    false2: q.dataValues.false2,
                    false3: q.dataValues.false3,
                    category: q.dataValues.category,
                    image: q.dataValues.image 
                }
			})
		});
        if (toAcept){
            await NewQuestion.destroy({
            where: {
                id: id
        }})
    }
        return toAcept

    }  catch(error){
        console.log(`La pregunta no pudo ser aceptada: ${error}`)
    }
}

module.exports = {
    createNewQuestion, 
    getNewQuestion,
    deleteNewQuestion,
    aceptedNewQuestion
}
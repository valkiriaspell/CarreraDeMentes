const { Question, NewQuestion } = require("../db");

// Crea una nueva pregunta en la DB
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
        return {Error: 'Error al crear la pregunta:' + error}
    }
}

// Trae las nuevas preguntas desde la DB
const getNewQuestion = async () => {
    try {
        const infoNewQueation = await NewQuestion.findAll()
        return infoNewQueation

    } catch(error){
        return {Error: 'Error al traer las preguntas desde la DB:' + error}
    }
}

// Elimina una pregunta en la DB
const deleteNewQuestion = async (id) => {
    try {
        const removeNewQuestion = await NewQuestion.destroy({
            where: {
                id: id
        }})
        return removeNewQuestion

    } catch(error){
        return {Error: 'Error al eliminar la pregunta:' + error}
    }
}

// Acepta la nueva pregunta y la envia al modelo de preguntas originales
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
        return {Error: 'Error al aceptar la pregunta:' + error}
    }
}

module.exports = {
    createNewQuestion, 
    getNewQuestion,
    deleteNewQuestion,
    aceptedNewQuestion
}
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
        const toAcept = await NewQuestion.findOne({
            where: {
                id: id
            }
        })
        console.log(toAcept, "pregunta encontrada")
        await Question.create({
            question: toAcept.question, 
            answer: toAcept.answer,
            false1: toAcept.false1,
            false2: toAcept.false2,
            false3: toAcept.false3,
            category: toAcept.category,
            image: toAcept.image
        })
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
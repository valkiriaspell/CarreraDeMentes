const { NewQuestion } = require("../db");

const createNewQuestion = async (question, answer, false1, false2, false3, category, img) => {
    try {
        const info = await NewQuestion.create({
            question, 
            answer,
            false1,
            false2,
            false3,
            category,
            img
        })
        return info

    } catch(error){
        console.log(`La pregunta no pudo ser creada: ${error}`)
    }
}

module.exports = {
    createNewQuestion
}
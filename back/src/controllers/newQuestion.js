const { NewQuestion } = require("../db");
// VER RELACIONES. NEWQUESTION BELONGS TO QUESTION?
// PONER EN EL MODELO STATUS DE ACEPTADO O RECHAZADO? SINO EN FRONT
// GUARDAR LA PREGUNTA, SI LO ACEPTO COMO ADMIN, EN EL MODELO QUESTION
// ELIMINAR LA PREGUNTA SI LA RECHAZE

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
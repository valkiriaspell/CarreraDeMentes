var express = require('express');
var router = express.Router();
module.exports = router;
const { createNewQuestion } = require('../controllers/newQuestion')

// Para crear una nueva pregunta y almacenarla en la DB
router.post('/', async function (req, res){ 
    const { question, answer, false1, false2, false3, category, img } = req.body
    try {
        const addQuestion = await createNewQuestion(question, answer, false1, false2, false3, category, img)
        res.status(200).json(addQuestion)

    } catch(error) {
        res.status(404).send(`No se pudo guardar la pregunta en la DB: ${error}`)
    }
})
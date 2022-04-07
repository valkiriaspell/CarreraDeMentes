var express = require('express');
var router = express.Router();
module.exports = router;
const { createNewQuestion, getNewQuestion, deleteNewQuestion, aceptedNewQuestion } = require('../controllers/newQuestion')

// Para crear una nueva pregunta y almacenarla en la DB
router.post('/', async function (req, res){ 
    const { question, answer, false1, false2, false3, category, image, email } = req.body
    try {
        const addQuestion = await createNewQuestion(question, answer, false1, false2, false3, category, image, email)
        res.status(200).json(addQuestion)

    } catch(error) {
        res.status(404).send(`La pregunta no pudo ser guardada en la DB: ${error}`)
    }
})

router.get('/', async function (req, res) {
    const { id } = req.query
    try {
        const dataNewQuestion = await getNewQuestion(id)
        res.status(200).json(dataNewQuestion)

    } catch(error) {
        res.status(404).send(`La pregunta solicitada no se encuentra en la DB: ${error}`)
    }
})

router.delete('/', async function (req, res) {
    const { id } = req.body
    try {
        const deleteQuestion = await deleteNewQuestion(id)
        res.status(200).json(deleteQuestion)

    } catch(error) {
        res.status(404).send(`La pregunta no pudo ser eliminada de la DB: ${error}`)
    }
})

router.put('/', async function (req, res) {
    const { id } = req.body
    try {
        const updateQuestion = await aceptedNewQuestion(id)
        res.status(200).json(updateQuestion)

    } catch(error) {
        res.status(404).send(`La pregunta no pudo ser actualizada en la DB: ${error}`)
    }
})
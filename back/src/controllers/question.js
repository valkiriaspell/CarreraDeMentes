const question = require('../Questions.json');
const { Question, GameRoom } = require('../db');


// Guardar preguntas en base de datos
async function data() {
	try {


		const dt = JSON.parse(JSON.stringify(question));

		dt.forEach(async (elm) => {
			const { id, ...elms } = elm;
			await Question.findOrCreate({
				where: { id },
				defaults: { ...elms }
			})
		});
		const allQuestions = await Question.findAll();
		return allQuestions;
	} catch (e) {
		console.log(`Error al cargar las questions desde el JSON a la DB: ${e}`)
		return e
	}
}
// Obtener preguntas pedidas y linkear al gameroom correspondiente
async function getQuestions(count, category, idRoom) {
	try {

		const gameRoom = await GameRoom.findByPk(idRoom, {
			includes: [{
				model: Question,
				attributes: ["id"]
			}]
		})

		// validaciones
		if (count < 1) return [false, "Debe agregar al menos una pregunta"]
		if (!gameRoom) return [false, "La sala no fue encontrada"];

		const dbQuestions = await Question.findAll();
		const questionRoom = gameRoom.questions;
		const { questionAmout } = gameRoom;
		const idQuestionRoom = [];
		const questionList = [];
		const quetiosTotal = parseInt(count) + parseInt(questionAmout);
		const questions = new Set(); //2/35/256/58/45/78  random ids segun cantidad pedida



		// validaciones
		if (questionRoom && questionRoom.length) questionRoom.forEach(({ id }) => idQuestionRoom.push(id));
		if (questionAmout > 0 && !questionRoom) count = quetiosTotal;


		while (questions.size < count) {
			const q = getRandomInt(dbQuestions.length);
			if (category && (dbQuestions[q].category !== category)) {
				!idQuestionRoom.includes(q) && questions.add(q);
			} else {
				!idQuestionRoom.includes(q) && questions.add(q);

			}
		}

		questions.forEach(q => questionList.push(dbQuestions[q]));

		await gameRoom.setQuestions(questionList);
		await gameRoom.update({
			questionAmout: quetiosTotal
		}, {
			where: { id: idRoom }
		});

		return [true, "Question agregada correctamente"]

	} catch (e) {
		console.log("Error en la funcion para agregar question: ", e)
		return e;
	}
}


function getRandomInt(max) {
	return Math.floor(Math.random() * (max - 1)) + 1;
}

// Actualizar una pregunta en la DB
async function updateQuestions (id, question, answer, false1, false2, false3, category, image) {
	try {
		const findQuestion = await Question.findOne({
			where: {
				id: id
			}})
		const modifyQuestion = await findQuestion.update({
			question: question,
			answer: answer,
			false1: false1,
			false2: false2,
			false3: false3,
			category: category,
			image: image
		})
		return modifyQuestion

	} catch (error) {
		console.log(`Error en la función para actualizar la pregunta en la DB: ${error}`)
	}
}

module.exports = {
	data,
	getQuestions,
	updateQuestions
};

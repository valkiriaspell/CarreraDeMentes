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



		// Validaciones
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

		await gameRoom.addQuestion(questionList);
		await gameRoom.update({
			questionAmout: quetiosTotal
		}, {
			where: { id: idRoom }
		});

		return [true, "Question agregadas correctamente"]

	} catch (e) {
		console.log("Error en la funcion para agregar question: ", e)
		return e;
	}
}


function getRandomInt(max) {
	return Math.floor(Math.random() * (max - 1)) + 1;
}

module.exports = {
	data,
	getQuestions,
};

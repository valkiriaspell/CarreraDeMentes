const question = require('../Questions.json');
const { Question } = require('../db');


//Guardar preguntas en base de datos
async function data() {
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
}
//Obtener preguntas pedidas y linkear al gameroom correspondiente
async function getQuestions(count, category, idRoom) {
	const dbQuestions = await Question.findAll();
	const questionList = [];

	let questions = new Set() //2/35/256/58/45/78  random ids segun cantidad pedida
	while (questions.size < count) {
		q = Math.floor((Math.random() * dbQuestions.length) % dbQuestions.length);
		if (dbQuestions[q].category !== category) {
			questions.add(q)
		}
	}
	
	//guardo las preguntas en questionList
	questions.forEach(q => questionList.push(dbQuestions[q]))
	// return questionList	//Descomentar si necesitamos ver en thunder las preguntas traidas.
	
	const room = await GameRoom.findOne({
		where: {
			id: idRoom,
		},
	});
	await room.setQuestions(questions)
}

module.exports = {
	data,
	getQuestions,
};

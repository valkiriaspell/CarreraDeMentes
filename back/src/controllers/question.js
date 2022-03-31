const question = require('../Questions.json');
const {Question} = require('../db');

//Guardar preguntas en base de datos
async function data() {
	const dt = JSON.parse(JSON.stringify(question));

	dt.forEach(async (elm) => {
		const {id, ...elms} = elm;
		await Question.findOrCreate({
			where: { id },
			defaults: {...elms} 
		})
	});
	const allQuestions = await Question.findAll();
	return allQuestions;
}
//Random con cantidad de preguntas
async function getQuestions(count, category) {
	const questionNumbers = [];
	const questionList = [];
	const dbQuestions = await Question.findAll();
	for (let index = 0; index < count; index++) {
		var q;
		while (!questionNumbers.includes(q)) {
			q = Math.floor((Math.random() * dbQuestions.length) % dbQuestions.length);
			if (dbQuestions[q].category !== category) {
				questionNumbers.push(q);
				questionList.push(dbQuestions[q]);
			}
		}
	}
	return questionList;
	//a que room le agrego estas preguntas??
	// const room = await GameRoom.findOne({
	// 	where: {
	// 		id: idRoom,
	// 	},
	// });
	//room.setQuestions(questionNumber)
}

module.exports = {
	data,
	getQuestions,
};

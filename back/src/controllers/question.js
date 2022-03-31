const question = require('../Questions.json');
const {Question} = require('../db');

async function data() {
	const dt = JSON.parse(JSON.stringify(question));

	dt.forEach(async (elm) => {
		const {id, ...elms} = elm;
		await Question.create({...elms});
	});
	const allQuestions = await Question.findAll();
	return allQuestions;
}
module.exports = {
	data,
};

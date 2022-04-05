const axios = require('axios');
const app = require('./src/app.js');
const {conn} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({force: false}).then(() => {
	app.listen(process.env.PORT || 3001, async () => {
		await axios.get('http://localhost:3001/avatar');
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});

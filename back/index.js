const axios = require('axios');
const app = require('./src/app.js');
const { createUsers } = require('./src/controllers/users.js');
const { conn } = require('./src/db.js');
const { SUPERADMIN_NAME, SUPERADMIN_EMAIL, SUPERADMIN_PASS, SUPERADMIN_ADMIN } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
	app.listen(process.env.PORT, async () => {
		// if (process.env.PORT){
			await axios.get('/avatar');
			await axios.get('/coins/multiplesCoins');	
		// } else {
		// 	await axios.get('http://localhost:3001/avatar');
		// 	await axios.get('http://localhost:3001/coins/multiplesCoins');
		// }
		createUsers({
			name: SUPERADMIN_NAME,
			email: SUPERADMIN_EMAIL,
			password: SUPERADMIN_PASS,
			idAvatar: '1',
			admin: SUPERADMIN_ADMIN,
		});
		console.log('%s listening at PORT'); // eslint-disable-line no-console
	});
});

const axios = require('axios');
const app = require('./src/app.js');
const { getAvatars } = require('./src/controllers/avatars.js');
const { createUsers } = require('./src/controllers/users.js');
const coinsJson = require("./src/Coins.json");
const { conn } = require('./src/db.js');
const { addInitServerMultCoins } = require('./src/controllers/coins.js');
const { SUPERADMIN_NAME, SUPERADMIN_EMAIL, SUPERADMIN_PASS, SUPERADMIN_ADMIN } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
	app.listen(process.env.PORT, async () => {	
		getAvatars();	
		const data = await JSON.parse(JSON.stringify(coinsJson))	
		addInitServerMultCoins(data)		
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

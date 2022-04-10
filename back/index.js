const axios = require('axios');
const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAvatars } = require('./src/controllers/avatars.js');
const { addInitServerMultCoins } = require('./src/controllers/coins.js');
const { createUsers } = require('./src/controllers/users.js');
const { data } = require('./src/controllers/question.js');
const { SUPERADMIN_NAME, SUPERADMIN_EMAIL, SUPERADMIN_PASS, SUPERADMIN_ADMIN } = process.env;

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
	app.listen(process.env.PORT || 3001, async () => {
		getAvatars();	
		addInitServerMultCoins();
		data();
		createUsers({
			name: SUPERADMIN_NAME,
			email: SUPERADMIN_EMAIL,			
			idAvatar: '1',
			admin: SUPERADMIN_ADMIN,
		});
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});

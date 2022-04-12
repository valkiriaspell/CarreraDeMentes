const {Coins} = require('../db');
const coinsJson = require('../Coins.json');

// Agregar un coins
const addCoins = async ({coins, url}) => {
	try {
		await Coins.create({coins, url});

		return [true, 'coins agregadas a la base de datos'];
	} catch (e) {
		return [false, {error: 'Error al guardar los coins: ' + e}];
	}
};

const addMultCoins = async (array) => {
	try {
		array.forEach(async (obj) => {
			await Coins.create(obj);
		});
		return [true, 'Creados: ' + array.length];
	} catch (e) {
		return [false, {error: 'Error al guardar las coins: ' + e}];
	}
};

const addInitServerMultCoins = async () => {
	try {
		const data = await JSON.parse(JSON.stringify(coinsJson));

		data.forEach(async (obj) => {
			await Coins.findOrCreate({
				where: {coins: obj.coins},
				defaults: {...obj},
			});
		});
		return [true, 'Creados: ' + data.length];
	} catch (error) {
		return [false, {error: 'Error al guardar los coins: ' + e}];
	}
};

const coinsInicialDeploy = async () => {
	try {
		const dataCoins = JSON.parse(JSON.stringify(coinsJson));

		dataCoins.map(async (obj) => {
			await Coins.findOrCreate({
				where: {coins: obj.coins},
				defaults: {...obj},
			});
		});
		return [true, 'Creados: ' + dataCoins.length];
	} catch (error) {
		return [false, {error: 'Error al guardar los coins: ' + e}];
	}
};

// Devolver todos los coins de menor a amayor
const getAllMinMaxCoins = async () => {
	try {
		const data = await Coins.findAll();

		if (!data.length)
			return [false, 'No se encontro coins en la base de datos'];

		const orederMaxMin = await data.sort(orederMinMaxRanting);

		return [true, orederMaxMin];
	} catch (error) {
		return [false, {error: 'Error al guardar los coins: ' + e}];
	}
};

// Actualizar un coins
const updateCoins = async ({idCoins, newCoins}) => {
	try {
		const data = await Coins.findByPk(idCoins);

		if (!data) return [false, 'No se encontro el coins a modificar'];

		await data.update({coins: newCoins});

		return [true, 'Se actualizo con exito el coins'];
	} catch (error) {
		return [false, {error: 'Error al guardar los coins: ' + e}];
	}
};

// Eliminar un conis
const deleteCoins = async ({idCoins}) => {
	try {
		const data = await Coins.destroy({where: {id: idCoins}});

		return data > 1
			? [true, 'Eliminado con exito']
			: [false, 'No se encontraron coins para eliminar'];
	} catch (error) {
		console.log(e);
		return [false, {error: 'Error al eliminar las coins: ' + e}];
	}
};

// oredenar de menor a mayor por coins
const orederMinMaxRanting = (a, b) => {
	if (a.coins > b.coins) return 1;
	if (b.coins > a.coins) return -1;
	return 0;
};

module.exports = {
	addCoins,
	addMultCoins,
	addInitServerMultCoins,
	coinsInicialDeploy,
	getAllMinMaxCoins,
	updateCoins,
	deleteCoins,
};

const {Coins} = require('../db');
const coinsJson = require('../Coins.json');

// Agregar una coin
const addCoins = async ({coins, url}) => {
	try {
		await Coins.create({coins, url});

		return [true, 'Coin agregada a la base de datos'];
	} catch (e) {
		return [false, {error: 'Error al agregar una coin: ' + e}];
	}
};

// Agregar varias coins
const addMultCoins = async (array) => {
	try {
		array.forEach(async (obj) => {
			await Coins.create(obj);
		});
		return [true, 'Creados: ' + array.length];
	} catch (e) {
		return [false, {error: 'Error al agregar varias coins: ' + e}];
	}
};

// Agregar coins iniciales a la DB
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
		return [false, {error: 'Error al agregar las coins a la DB desde el JSON: ' + e}];
	}
};

// Agregar coins iniciales a la DB para deploy
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
		return [false, {error: 'Error al agregar las coins a la DB desde el JSON para deploy: ' + e}];
	}
};

// Devolver todos las coins de menor a amayor
const getAllMinMaxCoins = async () => {
	try {
		const data = await Coins.findAll();

		if (!data.length)
			return [false, 'No se encontraron coins en la base de datos'];

		const orederMaxMin = await data.sort(orederMinMaxRanting);

		return [true, orederMaxMin];
	} catch (error) {
		return [false, {error: 'Error al ordenar las coins: ' + e}];
	}
};

// Actualizar una coin
const updateCoins = async ({idCoins, newCoins}) => {
	try {
		const data = await Coins.findByPk(idCoins);

		if (!data) return [false, 'No se encontro ninguna coin a modificar'];

		await data.update({coins: newCoins});

		return [true, 'Coin actualizada con exito'];
	} catch (error) {
		return [false, {error: 'Error al actualizar la coin: ' + e}];
	}
};

// Eliminar una coin
const deleteCoins = async ({idCoins}) => {
	try {
		const data = await Coins.destroy({where: {id: idCoins}});

		return data > 1
			? [true, 'Coin eliminada con exito']
			: [false, 'No se encontro ninguna coin para eliminar'];
	} catch (error) {
		console.log(e);
		return [false, {error: 'Error al eliminar la coin: ' + e}];
	}
};

// Ordenar de menor a mayor las coins
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

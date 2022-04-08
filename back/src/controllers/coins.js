const { Coins } = require("../db");
const coinsInicial = require('../Coins.json')

// Agregar un coins
exports.addCoins = async ({ coins, url }) => {
    try {

        await Coins.create({ coins, url });

        return [true, "coins agragado a la base de datos"];

    } catch (e) {
        return [false, { error: "Error al guardar los coins: " + e }];
    }
}

exports.addMultCoins = async (array) => {
    try {

        array.forEach(async (obj) => {
            await Coins.create(obj);
        })
        return [true, "Creados: " + array.length]

    } catch (e) {

    }
}

exports.addInitServerMultCoins = async (array) => {
    try {

        array.forEach(async (obj) => {
            await Coins.findOrCreate({
                where: { coins: obj.coins },
                defaults: { ...obj }
            });
        })
        return [true, "Creados: " + array.length]

    } catch (e) {

    }
}

exports.coinsInicialDeploy = async () => {
    try {
        const dataCoins = JSON.parse(JSON.stringify(coinsInicial));
    
        dataCoins.forEach(async (obj) => {
            await Coins.findOrCreate({
                where: { coins: obj.coins },
                defaults: { ...obj }
            });
        })
        return [true, "Creados: " + array.length]

    } catch (error) {
        console.log('error de coins inicial', error)
    }
}

// Devolver todos los coins de menor a amayor
exports.getAllMinMaxCoins = async () => {
    try {
        const data = await Coins.findAll();

        if (!data.length) return [false, "No se encontro coins en la base de datos"];

        const orederMaxMin = await data.sort(orederMinMaxRanting);

        return [true, orederMaxMin];

    } catch (e) {
        return e;
    }
}

// Actualizar un coins
exports.updateCoins = async ({ idCoins, newCoins }) => {
    try {
        const data = await Coins.findByPk(idCoins);

        if (!data) return [false, "No se encontro el coins a modificar"];

        await data.update({ coins: newCoins });

        return [true, "Se actualizo con exito el coins"];

    } catch (e) {
        return e;
    }
}

// Eliminar un conis
exports.deleteCoins = async ({ idCoins }) => {
    try {
        const data = await Coins.destroy({ where: { id: idCoins } });

        return data > 1 ? [true, "Eliminado con exito"] : [false, "No se encontro el coins para aliminar"]
    } catch (e) {
        console.log(e)
        return e
    }
}


// oredenar de menor a mayor por coins
const orederMinMaxRanting = (a, b) => {
    if (a.coins > b.coins) return 1;
    if (b.coins > a.coins) return -1;
    return 0;
};
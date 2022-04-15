const { GameRoom, Question, Users, Chat, Avatar } = require('../db.js');
const avatars = require("../Avatars.json")

// Carga los avatars a la DB y los devuelve
const getAvatars = async () => {
    try {
        const infoAvatars = JSON.parse(JSON.stringify(avatars));
    
        infoAvatars.map(a => {
            Avatar.findOrCreate({
                where: {
                    imageUrl: a.name
                }
            })
        }) 
        const dbAvatar = await Avatar.findAll()
        return dbAvatar

    } catch (error) {
        return {Error: 'Error al encontrar los avatars:' + error}
    }
}

module.exports = {
    getAvatars
}
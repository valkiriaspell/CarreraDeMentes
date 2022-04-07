const { GameRoom, Question, Users, Chat, Avatar } = require('../db.js');
const avatars = require("../Avatars.json")

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
        console.log('Avatar no encontrado: ' + error)
    }
}

module.exports = {
    getAvatars
}
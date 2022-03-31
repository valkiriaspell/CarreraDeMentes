// VER AXIOS PARA EL LLAMADO A DONDE ESTEN ALMACENADOS LOS AVATARS. EN LA NUBE DE FIREBASE? ARMAR JSON?
// const axios = require('axios')
const { GameRoom, Question, Users, Chat, Avatar } = require('../db.js');

const getAvatars = async () => {
    try {
        const infoAvatars = await axios.get('URL DE DONDE ESTEN ALMACENADOS')
        // TOMO QUE LOS AVATARS ESTAN EN UN ARREGLO Y QUE CADA UNO ES UN OBJETO CON SU INFORMACION
        infoAvatars.map(a => {
            Avatar.findOrCreate({
                where: {
                    imageUrl: a.imageUrl
                }
            })
        }) 
        const dbAvatar = await Avatar.findAll()
        return dbAvatar

    } catch (error) {
        console.log('Avatar not found: ' + error)
    }
}

module.exports = {
    getAvatars
}
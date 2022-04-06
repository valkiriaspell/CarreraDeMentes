import axios from "axios"

export async function AddUserToPreRoom({idGameRoom, idUser, avatar}){
    console.log(idGameRoom, idUser)
    try{
        const {data} = await axios.put('http://localhost:3001/gameRoom', {idUser, idGameRoom, avatar})
        return data
    }catch(e) {
        console.log(e)
    }
}

export async function changeReady(id, bool){
    try{
        const {data} = await axios.put(`http://localhost:3001/users/ready/?id=${id}&bool=${bool}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}

export async function deleteRoom({id}){
    try{
        const {data} = await axios.delete(`http://localhost:3001/gameRoom/${id}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}
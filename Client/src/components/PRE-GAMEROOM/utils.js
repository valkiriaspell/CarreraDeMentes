import axios from "axios"

export async function AddUserToPreRoom({idGameRoom, idUser}){
    console.log(idGameRoom, idUser)
    try{
        const {data} = await axios.put('/gameRoom', {idUser, idGameRoom})
        return data
    }catch(e) {
        console.log(e)
    }
}

export async function changeReady(id, bool){
    try{
        const {data} = await axios.put(`/users/ready/?id=${id}&bool=${bool}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}

export async function deleteRoom({id}){
    try{
        const {data} = await axios.delete(`/gameRoom/${id}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}
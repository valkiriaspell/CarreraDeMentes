import axios from "axios"
import Swal from "sweetalert2";

export async function AddUserToPreRoom({idRoom, idUser}){
    console.log(idRoom, idUser)
    try{
        const {data} = await axios.put('/gameRoom', {idUser, idRoom})
        return data
    }catch(e) {
        console.log(e)
    }
}

export async function modifyHost(email, host) {
    try {
        const { data } = await axios.put(`/users/?email=${email}&host=${host}`)
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}

export async function modifyHostById(id, host) {
    try {
        const { data } = await axios.put(`/users/?id=${id}&host=${host}`)
        console.log(data)
    } catch (e) {
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

export async function removeUserRoom(idRoom, idUserDelet){
    try{
        const {data} = await axios.put('/gameRoom/delete', {idRoom, idUserDelet})
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}

export async function deleteRoom(idRoom){
    try{
        const {data} = await axios.delete(`/gameRoom/${idRoom}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}

export async function startGameAlready(idRoom, start){
    try{
        const {data} = await axios.put('/gameRoom/starRoot', {idRoom, start})
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}

export function getUrl() {
    var aux = document.createElement("input");
    const aux2 = window.location.href.split("/")
    aux.setAttribute("value", `http://localhost:3000/invitationRoom/${aux2[aux2.length - 1]}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    Swal.fire({
        icon: 'success',
        title: 'copiado',
        showConfirmButton: false,
        heightAuto: true,
        timer: 1000})
}

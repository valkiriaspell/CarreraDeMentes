import axios from "axios"
import Swal from "sweetalert2";

export async function AddUserToPreRoom({idRoom, idUser}){
    console.log(idRoom, idUser)
    try{
        const {data} = await axios.put('http://localhost:3001/gameRoom', {idUser, idRoom})
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

export async function deleteRoom({idRoom}){
    try{
        const {data} = await axios.delete(`http://localhost:3001/gameRoom/${idRoom}`)
        console.log(data)
    }catch(e) {
        console.log(e)
    }
}
export function getUrl() {
    var aux = document.createElement("input");
    aux.setAttribute("value", window.location.href);
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

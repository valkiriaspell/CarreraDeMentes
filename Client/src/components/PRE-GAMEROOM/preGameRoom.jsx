import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from './chat'
import EditRoom from './editRoom'
import useChat from './useChatSocketIo'

function PreGameRoom({match}) {
    const {preRoomUsers} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idGameRoom} = match.params;
    const {sendReady} = useChat(idGameRoom)


    if(autenticado){
        return (
            <div>
                <ul>
{/*                     {
                        preRoom?.map(user =>{
                            return (
                                <>
                                    <li key={user.email}>{user.name}</li>
                                    <button key={user.email} className={user.ready ? algo : otro}>listo</button>
                                </>
                            )
                        })
                    } */}
                    <li>personajes 1</li>
                    <li>personajes 2</li>
                    <li>personajes 3</li>
                    <li>personajes 4</li>
                    <li>personajes 5</li>
                    <li>personajes 6</li>
                </ul>

                <EditRoom />
                <Chat idGameRoom={idGameRoom}/>
                <button onClick={sendReady}>estoy listo</button>
            </div>
        )
    } else{
        history.push('/login')
        return <div></div>
    }
}
 

export default PreGameRoom;
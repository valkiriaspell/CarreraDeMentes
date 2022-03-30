import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Chat from './chat'
import EditRoom from './editRoom'

function PreGameRoom({match}) {
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idGameRoom} = match.params;


    if(autenticado){
        return (
            <div>
                <ul>
                    <li>personajes 1</li>
                    <li>personajes 2</li>
                    <li>personajes 3</li>
                    <li>personajes 4</li>
                    <li>personajes 5</li>
                    <li>personajes 6</li>
                </ul>
                <EditRoom />
                <Chat idGameRoom={idGameRoom}/>
            </div>
        )
    } else{
        history.push('/login')
        return <div></div>
    }
}
 

export default PreGameRoom;
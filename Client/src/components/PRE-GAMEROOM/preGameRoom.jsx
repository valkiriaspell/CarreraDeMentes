import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from './chat'
import EditRoom from './editRoom'
import useSocket from './useSocketIo'
import s from '../STYLES/preGameRoom.module.css'
import GameRoom from '../GAMEROOM/gameRoom'

function PreGameRoom({match}) {
    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idGameRoom} = match.params;
    const {sendReady, sendStartGame, stateGame} = useSocket(idGameRoom)

    function countReady(){
        const readys = preRoomUsers.filter(user => user.ready === true);
        return readys.length;
    }


    if(autenticado){
        return (
            stateGame === false
            ?
                <div>
                    <ul>
                        {
                            preRoomUsers?.map(user =>{
                                return (
                                    <>
                                        <li key={user.email}>{user.name}</li>
                                        <button key={user.email} className={s.inactive} id={user.email} >listo</button>
                                    </>
                                )
                            })
                        }
                        <li>personajes 1</li>
                        <li>personajes 2</li>
                        <li>personajes 3</li>
                        <li>personajes 4</li>
                        <li>personajes 5</li>
                        <li>personajes 6</li>
                    </ul>

                    <EditRoom />
                    <Chat idGameRoom={idGameRoom}/>
                    {
                        user.host === true
                            ? (<button 
                                disabled={preRoomUsers?.length -1 === countReady() ? false : true}
                                onClick={sendStartGame}
                            >
                                Iniciar
                            </button>)
                            : (<button 
                                onClick={sendReady}
                            >
                                Listo
                            </button>)
                    }  
                </div>
                
            : <GameRoom/>
        )
    } else{
        history.push('/login')
        return <div></div>
    }
}
 

export default PreGameRoom;
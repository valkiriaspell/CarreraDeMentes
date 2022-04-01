import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from './chat'
import EditRoom from './editRoom'
import useSocket from './useSocketIo'
import s from '../STYLES/preGameRoom.module.css'
import GameRoom from '../GAMEROOM/gameRoom'
import ListPlayers from "./listPlayers";

function PreGameRoom({match}) {
    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idGameRoom} = match.params;
    const {sendReady, sendStartGame, game, expelPlayer} = useSocket(idGameRoom)

    function countReady(){
        const readys = preRoomUsers.filter(user => user.ready === true);
        return readys.length;
    }

    function handleShareRoom(){

    }


    if(autenticado){
        return (
            game === false
            ?
                <div>
                    <ListPlayers expelPlayer={expelPlayer} />
                    <EditRoom />
                    <Chat idGameRoom={idGameRoom}/>
                    {
                        user.host === true
                            ? (<button 
                                disabled={preRoomUsers?.length -1 === countReady() ? false : true}
                                onClick={sendStartGame}
                                className={s.button}
                            >
                                Iniciar
                            </button>)
                            : (<button 
                                onClick={sendReady}
                            >
                                Listo
                            </button>)
                    }
                    <button onClick={handleShareRoom} >invitar</button>
                </div>
                
            : <GameRoom/>
        )
    } else{
        history.push('/login')
        return <div></div>
    }
}


export default PreGameRoom;
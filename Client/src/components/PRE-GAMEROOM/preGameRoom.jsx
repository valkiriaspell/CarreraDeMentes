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
    const {idUser} = match.params;
    const {sendReady, sendStartGame, game, expelPlayer} = useSocket(idUser)

    function countReady(){
        const readys = preRoomUsers?.users?.filter(user => user.ready === true);
        return readys?.length;
    }


    if(autenticado){
        return (
            game === false
            ?
                <div className={s.container}>
                    <div>
                    <ListPlayers expelPlayer={expelPlayer} />
                    </div>
                    <div className={s.container2}>
                    <div>
                    <EditRoom />
                    </div>
                    <div>
                    <Chat idUser={idUser}/>
                    </div>
                    
                    <div>
                    {
                        user.host === true
                            ? (<button 
                                disabled={preRoomUsers?.length -1 === countReady ? false : true}
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
                    <button >invitar</button>
                    </div>
                </div>
                </div>
                
            : <GameRoom/>
        )
    } else{
        history.push('/login')
        return <div></div>
    }
}


export default PreGameRoom;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from './chat'
import EditRoom from './editRoom'
import useSocket from './useSocketIo'
import s from '../STYLES/preGameRoom.module.css'
import GameRoom from '../GAMEROOM/gameRoom'
import ListPlayers from "./listPlayers";
import { Link } from "react-router-dom";
/* import { AddUserToPreRoom, listUsersInPreRoom, loginUser } from "../../redux/actions"; */
import style from "../STYLES/form.css"
function PreGameRoom({match}) {
    /* const dispatch = useDispatch(); */
    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')
    const {idUser} = match.params;
    /* const email = localStorage.getItem("email"); */
/*     useEffect(() =>{ 
                !user.host &&
                loginUser(email)
                .then((val)=>{
                    AddUserToPreRoom({
                        idGameRoom: idUser, 
                        idUser: val
                    })
                })
                .then((value) => listUsersInPreRoom(value))
    }, [email]) */
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
                    <Link to="/home"><button className={style.volver} >← Volver atras </button></Link>
                    <div>
                    <ListPlayers expelPlayer={expelPlayer} />
                    </div>
                    <div>
                    <div>
                    <EditRoom />
                    </div>
                    <div>
                    <Chat idUser={idUser}/>
                    </div>
                    
                    <div className={s.buttonsPreGameRoom}>
                    {
                        user?.host === true
                            ? (<button 
                                disabled={preRoomUsers?.users?.length -1 === 0 ? true : preRoomUsers?.users?.length -1 === countReady ? true : false}
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
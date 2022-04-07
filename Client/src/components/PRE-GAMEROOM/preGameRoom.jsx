import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from "./chat";
import EditRoom from "./editRoom";
import useSocket from "./useSocketIo";
import s from "../STYLES/preGameRoom.module.css";
import GameRoom from "../GAMEROOM/gameRoom";
import ListPlayers from "./listPlayers";
import { Link } from "react-router-dom";
/* import { AddUserToPreRoom, listUsersInPreRoom, loginUser } from "../../redux/actions"; */
import style from "../STYLES/form.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillSound } from "react-icons/ai";
import readyDark from "../IMG/readyDark.png"
import readyGreen from "../IMG/readyGreen2.png"

function PreGameRoom({match}) {
/*     const dispatch = useDispatch(); */
    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idUser} = match.params;
/*     const email = localStorage.getItem("email");
    useEffect(() =>{
                !user.host &&
                dispatch(loginUser(email))
                .then((val)=>{
                    dispatch(AddUserToPreRoom({
                        idGameRoom: idUser, 
                        idUser: val
                    }))
                })
                .then((value) => dispatch(listUsersInPreRoom(value)))
    }, [user]) */
  const { sendReady, sendStartGame, game, expelPlayer, roomConfig } = useSocket(idUser);

  function countReady() {
    /* console.log('entre en count') */
    const arrayIds = preRoomUsers?.users?.map(user => user.id)
    let readys = 0;
    let imgReady = ""
    for(let i = 0; i < arrayIds?.length; i++){
      imgReady = document.getElementById(arrayIds[i])
/*       console.log(imgReady)
      console.log(readyGreen) */
      if(imgReady?.src === readyGreen) readys++
    }
    /* console.log(readys) */
    return readys
  }
  

  if (autenticado) {
    return game === false ? (
      <div className={s.container}>
        <div className={s.navPreGameRoom}>
          <Link style={{ textDecoration: "none" }} to="/home">
            <button className={style.volver}>
              <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} />
              Volver
            </button>
          </Link>
          <h3>Logo</h3>
          <AiFillSound style={{ width: "30px" }} />
        </div>
        <div>
          <ListPlayers expelPlayer={expelPlayer} />
        </div>
        <div>
          <div>
            <EditRoom idUser={idUser}/>
          </div>
          <div>
            <Chat idUser={idUser} />
          </div>

          <div className={s.buttonsPreGameRoom}>

            {
              user?.host === true 
                ? (
                <button
                  disabled={
                    preRoomUsers?.users?.length - 1 === 0
                      ? true
                      : preRoomUsers?.users?.length - 1 === countReady()
                        ? false
                        : true
                  }
                  onClick={sendStartGame}
                  className={s.button}
                >
                  Iniciar
                </button>
                ) 
                : <button onClick={sendReady}>Listo</button>  
            }
            <button>Invitar</button>
          </div>
        </div>
      </div>
    ) : (
      <GameRoom preRoomUsers={preRoomUsers} />
    );
  } else {
    history.push("/login");
    return <div></div>;
  }
}

export default PreGameRoom;

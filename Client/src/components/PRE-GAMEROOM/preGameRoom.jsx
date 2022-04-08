import React from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from "./chat";
import EditRoom from "./editRoom";
import useSocket from "./useSocketIo";
import s from "../STYLES/preGameRoom.module.css";
import GameRoom from "../GAMEROOM/gameRoom";
import ListPlayers from "./listPlayers";
import { Link } from "react-router-dom";
import style from "../STYLES/form.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import readyGreen from "../IMG/readyGreen2.png"
import { getUrl } from "./utils";

function PreGameRoom({match}) {

    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idUser} = match.params;

  const { sendReady, sendStartGame, game, expelPlayer } = useSocket(idUser);

  function countReady() {

    const arrayIds = preRoomUsers?.users?.map(user => user.id)
    let readys = 0;
    let imgReady = ""
    for(let i = 0; i < arrayIds?.length; i++){
      imgReady = document.getElementById(arrayIds[i])

      if(imgReady?.src === readyGreen) readys++
    }

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
          <div className="logo">
                <img width="200px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Fzooper-logo.png?alt=media&token=d211e20b-1313-420f-91a8-aa791a6aae3c"></img>
            </div>
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
          <button className={s.buttonLink} onClick={getUrl} ><FaLink/></button>
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

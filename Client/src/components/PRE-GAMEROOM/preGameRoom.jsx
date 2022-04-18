import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Chat from "./chat";
import EditRoom from "./editRoom";
import useSocket from "./useSocketIo";
import s from "../STYLES/preGameRoom.module.css";
import GameRoom from "../GAMEROOM/gameRoom";
import ListPlayers from "./listPlayers";
import { Link } from "react-router-dom";
import "../STYLES/form.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { getUrl } from "./utils";
import Music from "../MUSICA/musica"

function PreGameRoom({match}) {

    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idUser} = match.params;

  const { sendReady, sendStartGame, game, expelPlayer, setGame, messages, sendMessage, handleSubmitConfig, 
          roomConfiguration, setRoomConfiguration, positions, allStartGame, everybodyPlays, points 
        } = useSocket(idUser);
  


  if (autenticado) {
    return game === false ? (
      <div className={s.container}>
        <div className={s.navPreGameRoom}>
          <Link style={{ textDecoration: "none" }} to="/home">
            <button className="buttonSides lowgreen">
              <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} />
              Volver
            </button>
          </Link>
          <div className="logo">
                <img width="200px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt="Logo"></img>
            </div>
           <div></div>
        </div>
        <div>
          <ListPlayers expelPlayer={expelPlayer} />
        </div>
        <div>
          <div>
            <EditRoom 
              idUser={idUser} 
              handleSubmitConfig={handleSubmitConfig} 
              roomConfiguration={roomConfiguration} 
              setRoomConfiguration={setRoomConfiguration}  
            />
          </div>
          <div>
            <Chat idUser={idUser} messages={messages} sendMessage={sendMessage} />
          </div>

          <div className={s.buttonsPreGameRoom}>
            <button className="buttonSides lowgreen" onClick={getUrl} ><FaLink/></button>
            {
              user?.host === true 
                ? (
                <button
                  disabled={
                    preRoomUsers?.users?.length - 1 === 0
                      ? true
                      : false
                  }
                  onClick={sendStartGame}
                  className="buttonSides lowgreen"
                >
                  Iniciar
                </button>
                ) 
                : preRoomUsers.users.find(us => us.id === user.id) &&
                 <button className="buttonSides lowgreen" onClick={sendReady}>Listo</button> 

            }
          </div>
        </div>
        <div style={{marginLeft: "1rem"}}>
        <Music />
        </div>
      </div>
    ) : (
      <GameRoom 
        preRoomUsers={preRoomUsers} 
        setGame={setGame} 
        positions={positions} 
        allStartGame={allStartGame} 
        everybodyPlays={everybodyPlays} 
        points={points} 
      />
    );
  } else {
    history.push("/login");
    return <div></div>;
  }
}

export default PreGameRoom;

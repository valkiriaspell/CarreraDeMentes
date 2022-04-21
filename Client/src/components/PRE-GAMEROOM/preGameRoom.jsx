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
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PreGameRoom({match}) {

    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')

    const {idUser} = match.params;

  const { sendReady, sendStartGame, game, expelPlayer, setGame, messages, sendMessage, handleSubmitConfig, 
          roomConfiguration, setRoomConfiguration, positions, allStartGame, everybodyPlays, points, setPoints
        } = useSocket(idUser);
  


  if (autenticado) {
    return game === false ? (
      <div className={s.container}>
        <div className={s.navPreGameRoom}>
          <Link style={{ textDecoration: "none" }} to="/home">
            <button style={{color: "rgba(255, 255, 255, 0.829)"}} className="buttonSides lowgreen">
              Volver
            </button>
          </Link>
          <div className="logo">
                <img width="180px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt="Logo"></img>
            </div>
            <div>
          <Music />
        </div>
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
                  onClick={sendStartGame}
                  className="buttonSides lowgreen"
                >
                  Iniciar
                </button>
                ) 
                : preRoomUsers?.users?.find(us => us.id === user.id) &&
                 <button className="buttonSides lowgreen" onClick={sendReady}>Listo</button> 

            }
          </div>
        </div>
        <ToastContainer />
      </div>
    ) : (
      <GameRoom 
        preRoomUsers={preRoomUsers} 
        setGame={setGame} 
        positions={positions} 
        allStartGame={allStartGame} 
        everybodyPlays={everybodyPlays} 
        points={points} 
        setPoints={setPoints}
      />
    );
  } else {
    history.push("/login");
    return <div></div>;
  }
}

export default PreGameRoom;

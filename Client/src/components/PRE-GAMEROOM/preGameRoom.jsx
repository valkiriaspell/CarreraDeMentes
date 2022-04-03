import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
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
    /* const dispatch = useDispatch(); */
    const {preRoomUsers, user} = useSelector(state => state)
    const history = useHistory();
    const autenticado = localStorage.getItem('token')
    /* console.log("match: ", match.params) */
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
  const { sendReady, sendStartGame, game, expelPlayer, image } = useSocket(idUser);

  function countReady() {
    const readys = preRoomUsers?.users?.filter((user) => user.ready === true);
    return readys?.length;
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
          <ListPlayers expelPlayer={expelPlayer} image={image}/>
        </div>
        <div>
          <div>
            <EditRoom />
          </div>
          <div>
            <Chat idUser={idUser} />
          </div>

          <div className={s.buttonsPreGameRoom}>
            {/* <NavLink to={"/partida"}>
              <button>Iniciar</button>
            </NavLink> */}
            {user?.host === true 
            ? (
              <button
                disabled={
                  preRoomUsers?.users?.length - 1 === 0
                    ? true
                    : preRoomUsers?.users?.length - 1 === countReady
                    ? true
                    : false
                }
                onClick={sendStartGame}
                className={s.button}
              >
                Iniciar
              </button>
            ) : (
              <button onClick={sendReady}>Listo</button>
            )}
            <button>Invitar</button>
          </div>
        </div>
      </div>
    ) : (
      <GameRoom />
    );
  } else {
    history.push("/login");
    return <div></div>;
  }
}

export default PreGameRoom;

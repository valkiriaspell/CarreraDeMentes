import React, { useEffect, useState } from "react";
import "../STYLES/gameListRoom.modules.css";
import { NavLink, useHistory } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import Search from "../IMG/search.png";
import { useDispatch, useSelector } from "react-redux";
import { listAllRooms, listUsersInPreRoom } from "../../redux/actions";
import { AddUserToPreRoom } from "../PRE-GAMEROOM/utils";
import Music from "../MUSICA/musica";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function GameListRoom() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state);
  const {listRooms} = useSelector(state => state)


/*   const searchGames = (e) => {
    if (e && e !== "") {
      const listGames = games.filter((a) =>
        a.name.toLowerCase().includes(e.toLowerCase())
      ); */
/*       setGames(listGames); */
/*       console.log(listGames); */
/*     }
  }; */


  useEffect(() => {
    dispatch(listAllRooms())
    setInterval(()=> dispatch(listAllRooms()), 4000);
  }, []);

  const refreshGames = () => {
    dispatch(listAllRooms())
  };
const history = useHistory()

  function handleJoinRoom(game){
    game.numberUsersInRoom >= 6
      ? toast.warn("la sala esta llena", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }) // mejorar alerta
      : AddUserToPreRoom({idRoom: game.id, idUser: user.id})
      .then(()=> dispatch(listUsersInPreRoom(game.id)))
      .then(() => {
        history.push(`/room/${game.id}`)})
      .catch((e)=> toast.warn(e, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
     
  }

  function handleWatchRoom(game){
      dispatch(listUsersInPreRoom(game.id))
      .then(() => {
        history.push(`/room/${game.id}`)})
     
  }
  return (
    <div >
      <div className="containerMusic" >
      <Music />
      </div>
      <div>
						<img width="250px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt='Logo'></img>
					</div>
    <div className="containerGameList">
      <div className="navGameList">
        <NavLink style={{ textDecoration: "none" }} to={"/home"}>
        <button className="buttonSides brown">
          <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} /> Volver
        </button>
        </NavLink>
        <div className="buscadorGameList">
          <button className="refreshGameList" onClick={refreshGames}>
            <HiOutlineRefresh />
          </button>
          <input
            type="text"
            placeholder="Buscar partidas"
            /* onChange={(e) => searchGames(e.target.value)} */
          />
          <img className="shGamelist" src={Search} alt="Search" />
        </div>
      </div>
      <div className="subtitleGameList">
        <h4>Anfitrión</h4>
        <h4>Integrantes</h4>
        <h4>Preguntas</h4>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {listRooms?.length > 0 ? (
        listRooms?.map((game) => {
          return (
            <div key={game.id} className="infoPartidas">
              <span>{game.name}</span>
              <span>{game.numberUsersInRoom}</span>
              <span style={{marginLeft: "3.5rem", marginRight: "-1rem"}} >{game.questionAmount}</span>
              <div className="buttons" >
                <button className="buttonSides brown" onClick={() => handleJoinRoom(game)} >Unirse</button>
                <button className="buttonSides blue" onClick={() => handleWatchRoom(game)} >Ver</button>
              </div>
            </div>
          );
        })
      ) : (
        <h3>No hay partidas disponibles</h3>
      )}
    </div>
    <ToastContainer />
    </div>
  );
}

export default GameListRoom;

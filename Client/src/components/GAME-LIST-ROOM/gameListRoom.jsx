import React, { useEffect, useState } from "react";
import "../STYLES/gameListRoom.modules.css";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import Search from "../IMG/search.png";

let arrayGames = [
  {
    name: "User2543",
    users: "3/6",
    questions: "20",
  },
  {
    name: "User5872",
    users: "2/6",
    questions: "15",
  },
  {
    name: "User7098",
    users: "4/6",
    questions: "20",
  },
  {
    name: "User9843",
    users: "5/6",
    questions: "10",
  },
  {
    name: "User4553",
    users: "1/6",
    questions: "15",
  },
];

function GameListRoom() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(arrayGames);
  }, [setGames]);

  const searchGames = (e) => {
    if (e && e !== "") {
      const listGames = games.filter((a) =>
        a.name.toLowerCase().includes(e.toLowerCase())
      );
      setGames(listGames);
      console.log(listGames);
    }
  };

  const refreshGames = () => {
    setGames(arrayGames);
  };

  return (
    <div className="containerGameList">
      <div className="navGameList">
        <NavLink style={{ textDecoration: "none" }} to={"/home"}>
        <button className="buttonVolver">
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
            onChange={(e) => searchGames(e.target.value)}
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
      </div>
      {games.length > 0 ? (
        games.map((game) => {
          return (
            <div key={game.name} className="infoPartidas">
              <span>{game.name}</span>
              <span>{game.users}</span>
              <span>{game.questions}</span>
              <button className="unirseGameList">Unirse</button>
            </div>
          );
        })
      ) : (
        <h3>No hay partidas disponibles</h3>
      )}
    </div>
  );
}

export default GameListRoom;

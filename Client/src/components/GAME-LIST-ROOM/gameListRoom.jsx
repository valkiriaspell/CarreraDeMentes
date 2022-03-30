import React from "react";
import "../STYLES/gameListRoom.modules.css"

function GameListRoom() {

    const arrayGames = [
        {
            name: "Partida2543",
            users: "3/6",
            questions: "20" 
        },
        {
            name: "Partida5872",
            users: "2/6",
            questions: "15" 
        },
        {
            name: "Partida7098",
            users: "4/6",
            questions: "20" 
        },
        {
            name: "Partida9843",
            users: "5/6",
            questions: "10" 
        },
        {
            name: "Partida4553",
            users: "1/6",
            questions: "15" 
        }
    ]

  return (
    <div className="containerGameList">
      <div className="titleGameList">
          <h3>Partidas Disponibles</h3>
      </div>
      <div className="subtitleGameList">
          <h4>
              Partida
          </h4>
          <h4>
              Integrantes
          </h4>
          <h4>
              Preguntas
          </h4>
          <span></span>
          <span></span>
      </div>
        {
            arrayGames.length > 0 ? arrayGames.map((game) => {
                return (
                    <div key={game.name} className="infoPartidas">
                        <span>{game.name}</span>
                        <span>{game.users}</span>
                        <span>{game.questions}</span>
                        <button className="buttonGameList">Unirse</button>
                    </div>
                )
            })
            : <h3>No hay partidas disponibles</h3>
        }
    </div>
  );
}

export default GameListRoom;

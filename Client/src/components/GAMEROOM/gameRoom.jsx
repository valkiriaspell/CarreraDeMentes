import React, { useState } from "react";
import "../STYLES/gameRoom.modules.css";
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";

function GameRoom({ preRoomUsers }) {
  const [showEndGame, setShowEndGame] = useState(false)
    
    
  return (
    <div className="containerGameRoom">
      { !showEndGame ?
        <>
        <ListPlayersRoom showEndGame={showEndGame} preRoomUsers={preRoomUsers}  />
        <Game setShowEndGame={setShowEndGame} showEndGame={showEndGame}/>
        <ChatGameRoom showEndGame={showEndGame} preRoomUsers={preRoomUsers}/>
        </>
        : <div>
          <h1>"Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"</h1>
        </div>
      }
      </div>
  );
}

export default GameRoom;

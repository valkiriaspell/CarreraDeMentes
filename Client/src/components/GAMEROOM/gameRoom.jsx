import React, { useState } from "react";
import "../STYLES/gameRoom.modules.css";
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";
import EndGame from "./endGame";

function GameRoom({ preRoomUsers }) {
  const [showEndGame, setShowEndGame] = useState(false)
    
    
  return (
    <div className="containerGameRoom">
      { !showEndGame ?
        <>
        <ListPlayersRoom preRoomUsers={preRoomUsers}  />
        <Game setShowEndGame={setShowEndGame} showEndGame={showEndGame}/>
        <ChatGameRoom preRoomUsers={preRoomUsers}/>
        </>
        : <div>
          <EndGame/>
        </div>
      }
      </div>
  );
}

export default GameRoom;

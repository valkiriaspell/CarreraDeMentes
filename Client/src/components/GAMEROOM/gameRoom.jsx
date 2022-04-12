import React, { useState } from "react";
import "../STYLES/gameRoom.modules.css";
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";
import EndGame from "./endGame";
import { useSelector } from "react-redux";

function GameRoom({ preRoomUsers }) {
  const { user } = useSelector((state) => state);
  const [showEndGame, setShowEndGame] = useState(false)
  const [userCoins, setUserCoins] = useState(user.coins);  
    
  return (
    <div className="containerGameRoom">
      { !showEndGame ?
        <>
        <ListPlayersRoom preRoomUsers={preRoomUsers}  />
        <Game userCoins={userCoins} setUserCoins={setUserCoins} setShowEndGame={setShowEndGame} showEndGame={showEndGame}/>
        <ChatGameRoom preRoomUsers={preRoomUsers}/>
        </>
        : <div>
          <EndGame user={user} userCoins={userCoins}/>
        </div>
      }
      </div>
  );
}

export default GameRoom;

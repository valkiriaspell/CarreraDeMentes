import React from "react";
import "../STYLES/gameRoom.modules.css";
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";

function GameRoom({ preRoomUsers }) {
    
    
  return (
    <div className="containerGameRoom">
      <ListPlayersRoom preRoomUsers={preRoomUsers}  />
      <Game />
      <ChatGameRoom />
    </div>
  );
}

export default GameRoom;

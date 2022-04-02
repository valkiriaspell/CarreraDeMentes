import React from "react";
import "../STYLES/gameRoom.modules.css"
import ChatGameRoom from "./gameAlerts";
import Game from "./game";
import ListPlayersRoom from "./listPlayersRoom";


function GameRoom({match}){
    // const {idGameRoom} = match.params;


    return (
        <div className="containerGameRoom">
            <ListPlayersRoom/>
            <Game/>
            <ChatGameRoom/>
        </div>
    )
}

export default GameRoom;
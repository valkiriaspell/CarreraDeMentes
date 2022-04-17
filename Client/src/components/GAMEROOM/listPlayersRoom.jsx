import React from "react";
import { useSelector } from "react-redux";
import Music from "../MUSICA/musica";


function ListPlayersRoom() {

  const { preRoomUsers, user } = useSelector((state) => state);

    return (
      <div>
      <div className="containerListPlayerRoom">
        {preRoomUsers &&
          preRoomUsers.users?.map((p, index) => {
            return (
              <div className={p.id === user.id ? "contentPlayerRoom" : "contentListPlayerRoom"} key={p.id}>
                <div className="positionPlayers">
                  <span>{index + 1}°</span>
                </div>
                <div className="infoPlayer">
                  <span style={{ fontWeight: "bold" }}>{p.name}</span>
                  <span>Puntos: {p.points} </span>
                </div>
                <img src={p?.avatars?.[0]?.imageUrl} alt="Avatar" width={50} />
              </div>
            );
          })}
      </div>
      </div>
    );
}

export default ListPlayersRoom;

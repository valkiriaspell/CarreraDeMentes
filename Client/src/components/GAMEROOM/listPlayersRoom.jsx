import React, { useEffect } from "react";


function ListPlayersRoom({ preRoomUsers }) {

  console.log(preRoomUsers);
 
  // useEffect(() => {
  //   preRoomUsers.users.sort((a, b) => {
  //     return b[0].points.localeCompare(a[0].points);
  //   });
  // }, [preRoomUsers.users[0].points]);
    return (
      <div className="containerListPlayerRoom">
        {preRoomUsers &&
          preRoomUsers.users.map((p, index) => {
            return (
              <div className="contentListPlayerRoom" key={p.id}>
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
    );
}

export default ListPlayersRoom;

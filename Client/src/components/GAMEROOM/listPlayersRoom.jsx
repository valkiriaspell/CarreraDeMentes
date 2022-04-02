import React, { useEffect, useState } from "react";

let listPlayers = [
  {
    username: "Valki",
    points: "420",
    avatar: "https://cdn-icons-png.flaticon.com/512/4322/4322991.png",
    position: "1°"
  },
  {
    username: "Edu",
    points: "800",
    avatar: "https://cdn-icons-png.flaticon.com/512/3382/3382653.png",
    position: "2°"
  },
  {
    username: "Nacho",
    points: "380",
    avatar: "https://cdn-icons-png.flaticon.com/512/3093/3093444.png", 
    position: "3°"
  },
  {
    username: "Marcos",
    points: "470",
    avatar: "https://cdn-icons-png.flaticon.com/512/3940/3940405.png",
    position: "4°"
  },
  {
    username: "0rne",
    points: "390",
    avatar: "https://cdn-icons-png.flaticon.com/512/3940/3940401.png",
    position: "5°"   
  },
  {
    username: "MatiBeier",
    points: "600",
    avatar: "https://cdn-icons-png.flaticon.com/512/1308/1308845.png",
    position: "6°"
  },
];


function ListPlayersRoom() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const orderPlayers = listPlayers.sort((a,b) => {
      return b.points.localeCompare(a.points)
    })  
    setPlayers(orderPlayers)
  },[setPlayers, players])


  return <div className="containerListPlayerRoom">
      {
          players && players.map((p, index) => {
              return (
                  <div className="contentListPlayerRoom" key={p.username}>
                          <div className="positionPlayers">
                          <span>{index + 1}°</span>
                          </div>
                      <div className="infoPlayer">
                          <span>{p.username}</span>
                          <span>Puntos: {p.points}</span>
                      </div>
                      <img src={p.avatar} alt="Avatar" width={50} />
                  </div>
              )
          })
      }
  </div>;
}

export default ListPlayersRoom;

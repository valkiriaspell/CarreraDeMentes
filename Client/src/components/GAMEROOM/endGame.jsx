import React, { useEffect } from "react";
import axios from "axios";
import "../STYLES/endGame.css";
import { useSelector } from "react-redux";

export default function EndGame({ userCoins, user }) {

  const { preRoomUsers } = useSelector((state) => state);
    
  useEffect(() => {
    const getCoins = async () => {
      await axios.post("http://localhost:3001/mercadopago", {
        coinsFinal: userCoins,
        email: user.email,
      });
    };
    getCoins();
  }, []);

  return (
    <div className="containerEG">
      <div className="scoreTable">
        <div className="interior">
          <div className="resultados">
            <li>Puesto</li>
            <li>Jugador</li>
            <li>Puntos ganados</li>
            <li>Experiencia</li>
          </div>
          <div>
            {
              preRoomUsers && 
              preRoomUsers.users.map((user, index) => {
                return (
                  <div className="contentListPlayerRoom" key={user.id}>
                <div className="positionPlayers">
                  <span>{index + 1}°</span>
                </div>
                <div className="infoPlayer">
                  <span style={{ fontWeight: "bold" }}>{user.name}</span>
                  <span>Puntos: {user.points}</span>
                  <span>Experienxia: +{index === 0 ? 100 : 50} </span>
                </div>
                <img src={user?.avatars?.[0]?.imageUrl} alt="Avatar" width={50} />
              </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

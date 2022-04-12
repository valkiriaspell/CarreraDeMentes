import React, { useEffect, useState } from "react";
import axios from "axios";
import "../STYLES/endGame.css";

export default function EndGame({ userCoins, user }) {
    
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
            <li>Nivel</li>
          </div>
          <div className="resultados">
            <li>1°</li>
            <li>Player 1</li>
            <li>120</li>
            <li>5</li>
          </div>
          <div className="resultados">
            <li>1°</li>
            <li>Player 1</li>
            <li>120</li>
            <li>5</li>
          </div>
        </div>
      </div>
    </div>
  );
}

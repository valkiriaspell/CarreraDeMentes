import React, { useEffect } from "react";
import axios from "axios";
import "../STYLES/endGame.css";
import { useSelector } from "react-redux";
import corona from "../IMG/king.png";
import corona2 from "../IMG/king2.png";
import corona3 from "../IMG/king3.png";
import { NavLink } from "react-router-dom";
import Music from "../MUSICA/musica";

export default function EndGame({setGame}) {
  const { preRoomUsers, user } = useSelector((state) => state);

  useEffect(() => {
    const getExperiencie = async () => {
      console.log(user);
      console.log(preRoomUsers);
      const boolean = preRoomUsers?.users[0].id === user?.id ? true : false;
      await axios.put(
        `/users/experience?id=${user.id}&winner=${boolean}`
      );
    };
    getExperiencie();
  }, []);

  const winners = (index) => {
    if (index === 0) {
      return (
        <img
          style={{ marginLeft: "-2.7rem", marginRight: "1rem" }}
          src={corona}
          alt="corona"
          width={30}
        ></img>
      );
    } else if (index === 1) {
      return (
        <img
          style={{ marginLeft: "-2.7rem", marginRight: "1rem" }}
          src={corona2}
          alt="corona"
          width={30}
        ></img>
      );
    } else if (index === 2) {
      return (
        <img
          style={{ marginLeft: "-2.7rem", marginRight: "1rem" }}
          src={corona3}
          alt="corona"
          width={30}
        ></img>
      );
    } else {
      <span></span>;
    }
  };

  function handleContinue(){
    setGame(false)
  }

  return (
    <div>
    <Music/>
    <div className="containerEG">
      <div className="scoreTable">
        <div className="interior">
          <div className="contentNavEndGame">
            <div className="navEndGame">
              <span>Puesto</span>
              <span>Jugador</span>
              <span>Puntos</span>
              <span>Experiencia</span>
              <div></div>
            </div>
          </div>
          <div className="playersEndGame">
            {preRoomUsers &&
              preRoomUsers.users.map((u, index) => {
                return (
                  <div className="listPlayersEndGame" key={u.id}>
                    <span>
                      {winners(index)}
                      {index + 1}°
                    </span>
                    {user.id === u?.id ? (
                      <span style={{ color: "rgb(214, 209, 83)" }}>{u.name}</span>
                    ) : (
                      <span>{u.name}</span>
                    )}

                    <span>{u.points}</span>
                    <span style={{ marginRight: "-1.4rem" }}>
                      +{index === 0 ? 100 : 50}{" "}
                    </span>
                    <img
                      className="avatarEndGame"
                      src={u?.avatars?.[0]?.imageUrl}
                      alt="Avatar"
                      width={50}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="containerButtons">
      <NavLink className="buttonEndgame" to='/home'>
        <button>Salir</button>
      </NavLink>
      <button className="buttonEndgame" onClick={handleContinue} >Continuar</button>
      </div>
    </div>
    </div>
  );
}

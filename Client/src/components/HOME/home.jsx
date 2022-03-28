import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../STYLES/home.modules.css";

function Home() {
  return (
    <div className="container">
      <div className="nav">
        <NavLink to={"/tienda"}>
          <button>Tienda</button>
        </NavLink>
        <h1>Inicio</h1>
        <div className="infoUser">
          <div>
            <h4>Avatar</h4>
          </div>
          <div className="nameUser">
            <span>User97</span>
            <span>Nivel: 7</span>
            <span>Monedas: 400</span>
          </div>
        </div>
      </div>
      <div className="content">
      <div className="contentButtons">
        <NavLink className="button" to={"/editProfile"}>
          <button>Mi perfil</button>
        </NavLink>
        <NavLink className="button" to={"/iniciarPartida"}>
          <button>Iniciar partida</button>
        </NavLink>
        <NavLink className="button" to={"/partidasDisponibles"}>
          <button>Partidas disponibles</button>
        </NavLink>
      </div>
      <div className="contentInstructions">
        <h3>¿Cómo Juego?</h3>
        <span>1. Invita a tus amigos</span>
        <span>2. Configura una partida a tu gusto</span>
        <span>
          3. Responde preguntas aletorias sobre las categorias selecionadas
        </span>
      </div>
      </div>
    </div>
  );
}

export default Home;

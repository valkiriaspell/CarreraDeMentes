import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { firebaseCerrarSesion } from "../../utils/Firebase";
import "../STYLES/home.modules.css";
import { FaPowerOff } from "react-icons/fa";
import UserCard from "./userCard";

function Home() {
  const history = useHistory();
  const autenticado = localStorage.getItem("token");

  async function handleSignOut(e) {
    e.preventDefault();
    await firebaseCerrarSesion();
    localStorage.clear();
    history.push("/");
  }

  if (autenticado) {
    return (
      <div className="container">
        <div className="nav">
          <div>
            <NavLink className="buttonsNav" to={"/tienda"}>
              <button>Tienda</button>
            </NavLink>
            <NavLink className="buttonsNav" to={"/editProfile"}>
              <button>Mi perfil</button>
            </NavLink>
          </div>
          <h1>Inicio</h1>
          <div className="infoUser">
            {/* COMPONENTE USERCARD */}
            <UserCard />
            <div>
              <NavLink className="buttonsNav" to={"/"}>
                <button onClick={e => handleSignOut(e)}>
                  <FaPowerOff />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="contentButtons">
            <NavLink className="button" to={"/iniciarPartida"}>
              <button>Iniciar partida</button>
            </NavLink>
            <NavLink className="button" to={"/partidasDisponibles"}>
              <button>Partidas disponibles</button>
            </NavLink>
            <NavLink className="button" to={"/añadirPregunta"}>
              <button>Crear Preguntas</button>
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
  } else {
    history.push("/");
    return <div></div>;
  }
}

export default Home;

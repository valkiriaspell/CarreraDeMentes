import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { firebaseCerrarSesion } from "../../utils/Firebase";
import "../STYLES/home.modules.css";
import { FaPowerOff } from "react-icons/fa";
import UserCard from "./userCard";
import Instructions from "./instructions";
import {BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp} from 'react-icons/bs';

function Home(props) {
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
            <UserCard location={props.location}/>
            <div>
              <NavLink className="buttonsNav" to={"/"}>
                <button className="buttonCerrarSesión" onClick={e => handleSignOut(e)}>
                  <FaPowerOff />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
            <div className="content">
            <div className="contentButtons">   
            <NavLink className="button" to={"/room"}>
              <button>Iniciar partida</button>
            </NavLink>
            <NavLink className="button" to={"/partidasDisponibles"}>
              <button>Partidas disponibles</button>
            </NavLink>
            <NavLink className="button" to={"/añadirPregunta"}>
              <button>Crear Preguntas</button>
            </NavLink>
            </div>
            <div>
              <Instructions />
            </div>
          </div>
          <div>
          <ul className="social-icons">
         <li><a href='http://www.facebook.com/sharer.php?u=https://www.linkedin.com/in/matias-beier-dev' target="blanck"><i><BsFacebook/></i></a></li> 
         <li><a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.linkedin.com/in/matias-beier-dev" target="blanck"><i><BsLinkedin/></i></a></li>
          <li><a href="https://twitter.com/intent/tweet?text=juega%20conmigo&url=https://www.linkedin.com/in/matias-beier-dev/&hashtags=CarreradeMente" target="blanck"><i><BsTwitter/></i></a></li>
          <li><a href="https://api.whatsapp.com/send?text=https://www.linkedin.com/in/matias-beier-dev" target="blanck"><i><BsWhatsapp/></i></a></li>
          </ul>
          </div>
      </div>
    );
  } else {
    history.push("/");
    return <div></div>;
  }
}

export default Home;

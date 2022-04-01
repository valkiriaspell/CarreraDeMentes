import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { firebaseCerrarSesion } from "../../utils/Firebase";
import "../STYLES/home.modules.css";
import { FaPowerOff } from "react-icons/fa";
import UserCard from "./userCard";
import Instructions from "./instructions";
import {BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp} from 'react-icons/bs';
import { modifyHost } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const autenticado = localStorage.getItem("token");
  const {user} = useSelector(state => state);
  async function handleSignOut(e) {
    e.preventDefault();
    await firebaseCerrarSesion();
    localStorage.clear();
    history.push("/");
  }

  function handleCreateRoom(user){
    dispatch(modifyHost())
    dispatch()
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
            <NavLink className="button" to={`/room/${user}`}>
              <button onClick={handleCreateRoom} >Iniciar partida</button>
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
          <a href='http://www.facebook.com/sharer.php?u=https://www.linkedin.com/in/matias-beier-dev' target="blanck"><BsFacebook/></a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.linkedin.com/in/matias-beier-dev" target="blanck"><BsLinkedin/></a>
          <a href="https://twitter.com/intent/tweet?text=juega%20conmigo&url=https://www.linkedin.com/in/matias-beier-dev/&hashtags=CarreradeMente" target="blanck"><BsTwitter/></a>
          <a href="https://api.whatsapp.com/send?text=https://www.linkedin.com/in/matias-beier-dev" target="blanck"><BsWhatsapp/></a>
      </div>
    );
  } else {
    history.push("/");
    return <div></div>;
  }
}

export default Home;
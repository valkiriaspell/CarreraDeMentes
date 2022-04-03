import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { firebaseCerrarSesion } from "../../utils/Firebase";
import "../STYLES/home.modules.css";
import { FaPowerOff } from "react-icons/fa";
import UserCard from "./userCard";
import Instructions from "./instructions";
import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { createRoom, modifyHost } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const autenticado = localStorage.getItem("token");
  const { user } = useSelector((state) => state);
  const email = localStorage.getItem("email");
  async function handleSignOut(e) {
    e.preventDefault();
    await firebaseCerrarSesion();
    localStorage.clear();
    history.push("/");
  }

  async function handleCreateRoom() {
    const idRoom = await dispatch(createRoom(user))
    dispatch(modifyHost())
    history.push(`/room/${idRoom?.id}`)
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
            <UserCard location={props.location} />
            <div>
              <NavLink className="buttonsNav" to={"/"}>
                <button
                  className="buttonCerrarSesión"
                  onClick={(e) => handleSignOut(e)}
                >
                  <FaPowerOff />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="contentButtons">
            <button className="button" onClick={handleCreateRoom}>
              Iniciar partida
            </button>
            <NavLink to={"/partidasDisponibles"}>
              <button className="button">Partidas disponibles</button>
            </NavLink>
            <NavLink to={"/añadirPregunta"}>
              <button className="button">Crear Preguntas</button>
            </NavLink>
          </div>
          <div>
            <Instructions />
          </div>
        </div>
        <div>
          <ul className="social-icons">
            <li>
              <a
                href="http://www.facebook.com/sharer.php?u=https://www.linkedin.com/in/matias-beier-dev"
                target="blanck"
              >
                <i>
                  <BsFacebook />
                </i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.linkedin.com/in/matias-beier-dev"
                target="blanck"
              >
                <i>
                  <BsLinkedin />
                </i>
              </a>
            </li>
            <li> 
              <a
                href="https://twitter.com/intent/tweet?text=juega%20conmigo&url=https://www.linkedin.com/in/matias-beier-dev/&hashtags=CarreradeMente"
                target="blanck"
              >
                <i>
                  <BsTwitter />
                </i>
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?text=https://www.linkedin.com/in/matias-beier-dev"
                target="blanck"
              >
                <i>
                  <BsWhatsapp />
                </i>
              </a>
            </li>
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

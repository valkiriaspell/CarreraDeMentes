import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginAsGuest } from "../../redux/actions";
import "../STYLES/landingPage.modules.css"
import Cat from "../IMG/cat.gif"


function LandingPage() {
    const dispatch = useDispatch()

    function handleLoginAsGuest(e){
        e.preventDefault();
        dispatch(loginAsGuest());
    }

    return (
        <div className="containerLanding">
            <div className="logoLanging">
                    <img src={Cat} alt="Cat"  width={300}/>
                    <span>Pagina en construcción... hacemos todo lo posible.</span>
            </div>
            <NavLink className="link" to='/home'>
                <button  onClick={e => handleLoginAsGuest(e)}>
                    Entrar como invitado
                </button>
            </NavLink>
            <NavLink className="link" to='/login'>
                <button>Iniciar sesion o Registrarse</button>
            </NavLink>
        </div>
    )
}

export default LandingPage;
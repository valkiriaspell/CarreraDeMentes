import React from "react";
import { NavLink } from "react-router-dom";
import { LoginAsGuest } from "../../redux/actions";


function LandingPage() {

    function handleLoginAsGuest(e){
        e.preventDefault();
        LoginAsGuest({
            user: "Anonimo",
            avatar: "urlAvatarAnonimo"
        });
    }

    return (
        <div>
            <NavLink to='/home'>
                <button onClick={e => handleLoginAsGuest(e)}>
                    Entrar como invitado
                </button>
            </NavLink>
            <NavLink to='/login'>
                Iniciar sesion o registrarse
            </NavLink>
        </div>
    )
}

export default LandingPage;
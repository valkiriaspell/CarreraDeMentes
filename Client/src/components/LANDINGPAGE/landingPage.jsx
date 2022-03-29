import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginAsGuest } from "../../redux/actions";


function LandingPage() {
    const dispatch = useDispatch()

    function handleLoginAsGuest(e){
        e.preventDefault();
        dispatch(loginAsGuest());
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
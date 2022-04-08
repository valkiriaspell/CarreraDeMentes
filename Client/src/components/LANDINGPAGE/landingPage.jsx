import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loginAsGuest } from "../../redux/actions";
import "../STYLES/landingPage.modules.css"
import Cat from "../IMG/cat.gif"


function LandingPage() {

    const { user } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    async function handleLoginAsGuest(e) {
        e.preventDefault();
        const guest = {
            guest: true,
        }
        const login = await dispatch(loginAsGuest(guest));
        if (login.email) {
            localStorage.setItem('token', login.email)
            localStorage.setItem('email', login.email)
            history.push("/home")
        }
        console.log(login)
    }

    return (
        <div className="landinpage">
        <div className="logo">
                <img width="350px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Fzooper-logo.png?alt=media&token=d211e20b-1313-420f-91a8-aa791a6aae3c"></img>
            </div>
                <div className="containerLanding">
                <div className="logoLanging">
                    <img src={Cat} alt="Cat" width={300} />
                    <span>Página en construcción... hacemos todo lo posible.</span>
                </div>
                <NavLink className="link" to='/home'>
                    <button onClick={e => handleLoginAsGuest(e)}>
                        Entrar como invitado
                    </button>
                </NavLink>
                <NavLink className="link" to='/login'>
                    <button>Iniciar sesión o Registrarse</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
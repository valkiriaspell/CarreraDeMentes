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
                <img width="500px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo5.png?alt=media&token=5e5bb88d-806a-4c38-b667-b27a9b5b01fc"></img>
            </div>
                <div className="containerLanding">
                <div className="logoLanging">                  
                    
                </div>
                <NavLink style={{margin:"1rem"}} to='/home'>
                    <button className="buttonSides brown" onClick={e => handleLoginAsGuest(e)}>
                        Entrar como invitado
                    </button>
                </NavLink>
                <NavLink  to='/login'>
                    <button className="buttonSides brown">Iniciar sesión o Registrarse</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
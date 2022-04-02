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

    async function handleLoginAsGuest(e){
        e.preventDefault();
        const guest = {
            guest: true,
        }
        const login = await dispatch(loginAsGuest(guest));
        if(login.email){
            localStorage.setItem('token', login.email)
            history.push("/home")
        }
        console.log(login)
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
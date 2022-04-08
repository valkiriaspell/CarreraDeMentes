import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import "../STYLES/admin.css"
import "../STYLES/home.modules.css"
import { FaPowerOff } from "react-icons/fa";
import { firebaseCerrarSesion } from '../../utils/Firebase';

export default function AdminNav() {

    const email = localStorage.getItem('email')
    const autenticado = localStorage.getItem('token')
    const history = useHistory();

    async function handleSignOut(e) {
        e.preventDefault();
        await firebaseCerrarSesion();
        localStorage.clear();
        history.push('/');
    }

    const location = useLocation();

    const { pathname } = location;

    const splitLocation = pathname.split("/")

    if (autenticado) {

        return (
            <div className="navAdmin">
                <div className='barraSaludo'>
                    <><button onClick={(e) => handleSignOut(e)} > <FaPowerOff /> </button></>
                    <><h6>¡Hola {email === "triviamastergrupo7@gmail.com" ? "Super Admin" : "Admin"}!</h6></>
                </div>
                <NavLink exact to="/adminHome/questions" className={splitLocation[2] === "questions" ? "linkSelected" : "btn draw-border"}   > Lista de Preguntas </NavLink>
                {email === "triviamastergrupo7@gmail.com" ?
                    <NavLink exact to='/adminHome/users' className={splitLocation[2] === "users" ? "linkSelected" : "btn draw-border"} > Lista de Usuarios </NavLink>
                    : null}


            </div>
        )
    }
}
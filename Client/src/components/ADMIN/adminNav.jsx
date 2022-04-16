import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import "../STYLES/admin.css"
import "../STYLES/home.modules.css"
import { FaPowerOff, FaHouseUser } from "react-icons/fa";
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
                  <div className='navGeneral'>
                      <NavLink exact to="/adminQuestions" className={splitLocation[2] === "questions" ? "linkSelected" : "btn btn-outline-dark"}>Revisar Preguntas</NavLink>
                      <NavLink exact to="/adminCurrentQuestions" className={splitLocation[2] === "currentQuestions" ? "linkSelected" : "btn btn-outline-dark"}>Modificar Preguntas</NavLink>
                       {email === "triviamastergrupo7@gmail.com" ?
                      <NavLink exact to='/adminUsers' className={splitLocation[2] === "users" ? "linkSelected" : "btn btn-outline-dark"}>Configurar Usuarios</NavLink>
                    : null}
                    <button className="btn btn-outline-dark" onClick={(e) => handleSignOut(e)}> <FaPowerOff/></button>
                </div>
        )
    }
}

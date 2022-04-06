import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import "../STYLES/admin.css"
import "../STYLES/home.modules.css"
import { FaPowerOff } from "react-icons/fa";

export default function AdminNav() {

    const location = useLocation();

    const { pathname } = location;

    const splitLocation = pathname.split("/")

    return (
        <div className="navAdmin">
                    <div className='barraSaludo'>
                        <><button > <FaPowerOff /> </button></>
                        <><h6>¡Hola Super Admin!</h6></>
                        </div>
                    <NavLink exact to="/adminHome/questions" className={splitLocation[2] === "questions"? "linkSelected" : "btn draw-border"}   > Lista de Preguntas </NavLink>
                    <NavLink exact to='/adminHome/users' className={splitLocation[2] === "users"? "linkSelected" : "btn draw-border"} > Lista de Usuarios </NavLink>
                    

        </div>
    )
}
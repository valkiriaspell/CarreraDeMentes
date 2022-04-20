import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import "../STYLES/admin.css"
import "../STYLES/home.modules.css"
import { FaPowerOff } from "react-icons/fa";
import { firebaseCerrarSesion } from '../../utils/Firebase';
import admin01 from '../IMG/Admin1.png'
import admin02 from '../IMG/Admin2.png'
import admin03 from '../IMG/Admin3.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions';

export default function AdminNav() {

    const email = localStorage.getItem('email')
    const autenticado = localStorage.getItem('token')
    const history = useHistory();
    const dispatch = useDispatch()

    const {user} = useSelector(state => state)

    useEffect(async () => {
		!user?.name && await dispatch(loginUser(email))
		console.log(user);
	}, []);
    

    async function handleSignOut(e) {
        e.preventDefault();
        await firebaseCerrarSesion();
        localStorage.clear();
        history.push('/');
    }

 
   if (user?.admin === "admin" || user?.admin === "superadmin") {
        return (
            <div className='adminHome'>
                <div className="navHomeAdmin">
                    <div className="logoZooperTrivia">
                    <img 
                        width="300px" 
                        src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" 
                        alt='Logo'>
                    </img>
                    </div>
                    <><h1>¡Hola {email === "triviamastergrupo7@gmail.com" ? "Super Admin" : "Admin"}!</h1></>
                    <><button onClick={(e) => handleSignOut(e)} className="buttonSides brown"> <FaPowerOff /> </button></>
                </div>
                <div className='cardContainer'>
                    <div className='cardAdmin'>
                        <br/>
                        <h4>Revisar Nuevas Preguntas</h4>
                        <hr/>
                        <NavLink exact to="/adminQuestions">
                            <img
                                src={admin01}
                                alt="Admin01">
                            </img>
                        </NavLink>
                        <hr/>
                        <p>Accede a la lista de preguntas y respuestas enviadas por los usuarios y analiza su contenido de acuerdo a las normativas de la companía, para aceptalas o rechazalas.
                        </p>
                    </div>
                    <div className='cardAdmin'>
                        <br/>
                        <h4>Modificar Preguntas</h4>
                        <hr/>
                        <NavLink exact to="/adminCurrentQuestions">
                            <img
                                src={admin02}
                                alt="Admin02">
                            </img>
                        </NavLink>
                        <hr/>
                        <p>Modifica las respuestas que consideres necesarias, existentes en la base de datos, de acuerdo a las últimas novedades.
                        </p>
                    </div>
                    <div className='cardAdmin'>
                        <br/>
                        <h4>Configurar Usuarios</h4>
                        <hr/>
                        <NavLink exact to="/adminUsers">
                            <img
                                src={admin03}
                                alt="Admin03">
                            </img>
                        </NavLink>
                        <hr/>
                        <p>Crea usuarios Admin, para que puedan actualizar preguntas y revisar las nuevas. Sanciona a aquellos jugadores, que no respeten las políticas de la companía.
                        </p>
                    </div>
                </div>
            </div>
        )
    } else {
		history.push('/');
		return <div></div>;
	}
}
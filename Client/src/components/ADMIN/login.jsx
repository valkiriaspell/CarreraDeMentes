import React, { useState } from 'react';
import Perfil from "../IMG/user.png"
import Email from "../IMG/email.png"
import Contraseña from "../IMG/unlock.png"
import "../STYLES/footer.css"
import { Link, useHistory } from 'react-router-dom';
import "../STYLES/login.modules.css"
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from '../../redux/actions';
import Swal from "sweetalert2";
import { firebaseLogin } from '../../utils/Firebase';

export default function LoginAdmin() {

    const dispatch = useDispatch()
    const history = useHistory();
    
    ////////////---->   local states  <----/////////////////
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    ////////////---->   Store States  <----/////////////////
    const {user} = useSelector(state => state)

////////////---->   On change Inputs  <----/////////////////
    function handleOnChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
        dispatch(loginUser(input.email));
      }
    
    async function handleLogin(e) {
        e.preventDefault();
        const login = await firebaseLogin(input.email, input.password);
        if(login?.accessToken){
            localStorage.setItem("email", login.email);
            localStorage.setItem("token", login.accessToken);
            if(user.admin === "superadmin" || user.admin === "admin") {
                history.push("/adminHome");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Acceso Denegado",
                    text: "No estás habilitado para esta sección ",
                    confirmButtonText: "OK",
                    heightAuto: false,
                });
            }          
        } else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Clave o usuario incorrecto",
                confirmButtonText: "OK",
                heightAuto: false,
            });
        }
    }


    return (
        <div className='containerLogin'>
            <div className="logo">
                <img width="220px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt="Logo"></img>
            </div>
            <div className='contentLogin'>
                <form onSubmit={(e) =>handleLogin(e)}>
                    <div className='imgUser'>
                        <img src={Perfil} alt="User" width={60} />
                    </div>
                    <div className='input'>
                        <img src={Email} alt="Email" width={22} />
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            value={input.email}
                            onChange={(e) => handleOnChange(e)}
                            autoComplete="off"
                        />
                    </div>
                    <div className='input'>
                        <img src={Contraseña} alt="Contraseña" width={20} />
                        <input
                            name='password'
                            type='password'
                            placeholder='Contraseña'
                            value={input.password}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <button className='buttonLogin' type='submit'>Ingresar</button>
                </form>
                <Link to="/"><button className='volver' >← Volver atras </button></Link>
                
            </div>
        </div>
    )
}
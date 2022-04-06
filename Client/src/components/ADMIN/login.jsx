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
      }
    function validations() {

    }
    
    function handleLogin(e) {
        e.preventDefault();
    dispatch(loginUser(input.email))
    if (user.email) {
        console.log(user, "user")
             
    } else {
        console.log(user, "hola")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario incorrecto",
            confirmButtonText: "OK",
            heightAuto: false,
          });
    }
    }


    return (
        <div className='containerLogin'>
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
import React, { useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import { firebaseLogin, firebaseLoginFacebook, firebaseLoginGoogle } from '../../../utils/Firebase';
import "../../STYLES/login.modules.css"
import Google from "../../IMG/google.png"
import Facebook from "../../IMG/facebook.png"
import Contraseña from "../../IMG/unlock.png"
import Email from "../../IMG/email.png"
import Arrow from "../../IMG/arrow.png"
import Perfil from "../../IMG/user.png"
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/actions';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory()

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({})

    function validar(input){
        let errors = {}

        if(input.password.length < 6){
            errors.password = 'La contraseña debe contener al menos 6 caracteres'
        }
        return errors
    }

    function handleOnChange(e){
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleLogin(e){
        e.preventDefault()
        const validacion = validar(input)

        if(Object.keys(validacion).length === 0){
            const login = await firebaseLogin(input.email, input.password)
            if(login.accessToken){
                dispatch(loginUser(input.email))
                localStorage.setItem('email', login.email)
                localStorage.setItem('token', login.accessToken)
                history.push('/home')
            }else{
                setError({mensaje: login})
            }
        }else{
            setError(()=> validacion)
        }
    }

    async function handleLoginGoogle(){
        const iniciarSesion = await firebaseLoginGoogle()
        if(iniciarSesion.accessToken){
            localStorage.setItem('email', iniciarSesion.email)
            localStorage.setItem('token', iniciarSesion.accessToken)
            history.push('/home')
        }else{
            setError({mensaje: iniciarSesion})
        }
    }

    async function handleLoginFacebook(){
        const iniciarSesion = await firebaseLoginFacebook()
        if(iniciarSesion.accessToken){
            localStorage.setItem('email', iniciarSesion.email)
            localStorage.setItem('token', iniciarSesion.accessToken)
            history.push('/home')
        }else{
            setError({mensaje: iniciarSesion})
        }
    }

  return (
    <div className='containerLogin'>
        <div className='contentLogin'>
        <form onSubmit={handleLogin}>
            <div className='imgUser'>
                <img src={Perfil} alt="User" width={60} />
            </div>
            <div className='input'>
            <img src={Email} alt="Email" width={22}/>
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
            <img src={Contraseña} alt="Contraseña" width={20}/>
            <input 
                name='password'
                type='password'
                placeholder='Contraseña'
                value={input.password}
                onChange={(e) => handleOnChange(e)}
            />
            </div>
            <button className='buttonLogin' type='submit'>Ingresar</button>
            <NavLink className="linkContraseña" to={'recuperarcontrasena'}>¿Olvidaste tu contraseña?</NavLink>
        </form>
        {error.mensaje && <p>{error.mensaje}</p>}
        {error.password && <p>{error.password}</p>}
        <div className='contentLogin2'>
            <img src={Arrow} alt="Arrow" className='imgArrow' width={27}/>
            <Link className='buttonSingUP' to={'/signup'}>Registrarse</Link>
            <button onClick={handleLoginFacebook}>Ingresar con Facebook <img src={Facebook} width={20} alt="Facebook" /></button>
            <button onClick={handleLoginGoogle}>Ingresar con Google <img src={Google} width={20} alt="Google" /></button>
        </div>
        </div>
    </div>
  )
}

export default Login
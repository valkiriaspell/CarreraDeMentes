import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { firebaseLogin, firebaseLoginFacebook, firebaseLoginGoogle } from '../../../utils/Firebase';

function Login() {

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
    <div>
        <form onSubmit={handleLogin}>
            <input 
                name='email'
                type='email'
                placeholder='Email'
                value={input.email}
                onChange={(e) => handleOnChange(e)}
            />
            <input 
                name='password'
                type='password'
                placeholder='Password'
                value={input.password}
                onChange={(e) => handleOnChange(e)}
            />
            <button type='submit'>Login</button>
        </form>
        {error.mensaje && <p>{error.mensaje}</p>}
        {error.password && <p>{error.password}</p>}
        <div>
            <Link to={'/signup'}>Sign Up</Link>
            <button onClick={handleLoginGoogle}>Login with Google</button>
            <button onClick={handleLoginFacebook}>Login with Facebook</button>
        </div>
    </div>
  )
}

export default Login
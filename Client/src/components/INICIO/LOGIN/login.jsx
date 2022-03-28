import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { firebaseLogin, firebaseLoginFacebook, firebaseLoginGoogle } from '../../../utils/Firebase';

function Login() {

    const history = useHistory()

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    function handleOnChange(e){
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleLogin(e){
        e.preventDefault()
        const login = await firebaseLogin(input.email, input.password)
        if(login.accessToken){
            alert('Usuario logueado con exito')
            // history.push('/home')
        }
    }

    async function handleLoginGoogle(){
        const iniciarSesion = await firebaseLoginGoogle()
        if(iniciarSesion.accessToken){
            alert('Usuario logueado con exito')
            // history.push('/home')
        } 
    }

    async function handleLoginFacebook(){
        const iniciarSesion = await firebaseLoginFacebook()
        if(iniciarSesion.accessToken){
            alert('Usuario logueado con exito')
            // history.push('/home')
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

        <div>
            <Link to={'/signup'}>Sign Up</Link>
            <button onClick={handleLoginGoogle}>Login with Google</button>
            <button onClick={handleLoginFacebook}>Login with Facebook</button>
        </div>
    </div>
  )
}

export default Login
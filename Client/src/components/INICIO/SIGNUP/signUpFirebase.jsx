import React, { useState } from 'react'
import { firebaseRegistrarUsuario } from '../../../utils/Firebase'
import { useHistory } from 'react-router-dom';

function SignUpFirebase() {

    const history = useHistory()

    const [input, setInput] = useState({
        username: '',
        avatar: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState({})

    function validar(input){
        let errors = {}

        if(input.username === ''){
            errors.username = 'El nombre de usuario es obligatorio'
        }
        if(input.avatar === ''){
            errors.avatar = 'El avatar es obligatorio'
        }
        if(input.email === ''){
            errors.email = 'El email es obligatorio'
        }
        if(input.password.length < 6){
            errors.password = 'La contraseña debe contener al menos 6 caracteres'
        }
        return errors
    }

    function handleChange(e){
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleRegister(e){
        e.preventDefault()
        const validacion = validar(input)

        if(Object.keys(validacion).length === 0){
            const registrar = await firebaseRegistrarUsuario(input.email, input.password)
            if(registrar.accessToken){
                localStorage.setItem('email', registrar.email)
                localStorage.setItem('token', registrar.accessToken)
                history.push('/home')
            }else{
                setError({mensaje: registrar})
            }
        }else{
            setError(()=> validacion)
        }
    }

  return (
    <div>
        <form onSubmit={handleRegister}>
            <input 
                name='username'
                type='text'
                placeholder='Username'
                value={input.username}
                onChange={(e) => handleChange(e)}
            />

            <select name='avatar' onChange={(e) => handleChange(e)} defaultValue='Seleccione un avatar'>
                <option disabled={true}>Seleccione un avatar</option>
                <option value='avatar 1'>Avatar 1</option>
                <option value='avatar 2'>Avatar 2</option>
                <option value='avatar 3'>Avatar 3</option>
                <option value='avatar 4'>Avatar 4</option>
            </select>

            <input 
                name='email'
                type='email'
                placeholder='Email'
                value={input.email}
                onChange={(e) => handleChange(e)}
            />

            <input 
                name='password'
                type='password'
                placeholder='Password'
                value={input.password}
                onChange={(e) => handleChange(e)}
            />
            <button type='submit'>Registrarse</button>
        </form>
        {error.username && <p>{error.username}</p>}
        {error.avatar && <p>{error.avatar}</p>}
        {error.email && <p>{error.email}</p>}
        {error.password && <p>{error.password}</p>}
        {error.mensaje && <p>{error.mensaje}</p>}
    </div>
  )
}

export default SignUpFirebase
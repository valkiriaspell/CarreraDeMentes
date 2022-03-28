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

    function handleChange(e){
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleRegister(e){
        e.preventDefault()
        const registrar = await firebaseRegistrarUsuario(input.email, input.password)
        if(registrar.accessToken){
            alert('Usuario registrado con exito')
            // history.push('/home')
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
    </div>
  )
}

export default SignUpFirebase
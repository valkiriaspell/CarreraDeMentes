import React, { useState } from 'react'
import { firebaseRecuperarContrasena } from '../../../utils/Firebase'

function RecuperarContrasena() {

    const [input, setInput] = useState({
        email: ''
    })

    async function handleClick(e){
        e.preventDefault()
        const test = await firebaseRecuperarContrasena(input.email)
        console.log(test)
    }

  return (
    <div>
        <form onSubmit={handleClick}>
            <input 
                name='email'
                type='email'
                placeholder='Email'
                value={input.email}
                onChange={(e) => setInput({...input, email: e.target.value})}
            />
            <button type='submit'>Restablecer Contraseña</button>
        </form>
    </div>
  )
}

export default RecuperarContrasena
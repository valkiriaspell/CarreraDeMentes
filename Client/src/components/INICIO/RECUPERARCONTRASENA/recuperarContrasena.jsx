import React, { useState } from 'react'
import { firebaseRecuperarContrasena } from '../../../utils/Firebase'
import Swal from "sweetalert2";

function RecuperarContrasena() {

    const [input, setInput] = useState({
        email: ''
    })

    async function handleClick(e){
        e.preventDefault()
        const test = await firebaseRecuperarContrasena(input.email)
        Swal.fire({
            icon: 'success',
            title: 'Te mandamos un email para que recuperes tu contraseña, por favor revisa tu bandeja de entrada',
            showConfirmButton: false,
            heightAuto: false,
            timer: 3000
          })
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
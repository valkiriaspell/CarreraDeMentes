import React, { useState } from 'react';
import Perfil from "../IMG/user.png"
import Email from "../IMG/email.png"
import Contraseña from "../IMG/unlock.png"
import "../STYLES/footer.css"

export default function LoginAdmin() {
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    
    return (
        <div className='containerLogin'>
            <div className='contentLogin'>
                <form >
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
                 
                        />
                    </div>
                    <button className='buttonLogin' type='submit'>Ingresar</button>
                </form>
            </div>
        </div>
    )
}
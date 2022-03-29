import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../../redux/actions';
import { useHistory } from 'react-router-dom'
import "../STYLES/editProfile.css"


export default function EditProfile() {
    const dispatch = useDispatch()
    const history = useHistory();
    
    
    //////////  ---->    Local states data   <------ //////////////
    const [msg, setMSG] = useState('');
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [mail, setMail] = useState("");
    const [avatar, setAvatar] = useState("");
    
    //////////  ---->    Local states errors   <------ //////////////
    const [errorName, setErrorName] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const [errorPass2, setErrorPass2] = useState("")
    const [errorMail, setErrorMail] = useState("")    
    const [errorCurrentP, setErrorCurrentP] = useState("")

    //////////  ---->    Store states    <------ //////////////
    //necesito traerme la pass actual de este usuario... para comparar en el form.
    const examplePass = "123" 

    //////////////// ---->    VALIDATIONS    <------ /////////////

  function validation(e) {
    switch (true) {

        case e.target.name === "name":
          if (!/^[a-zA-Z ]*$/.test(e.target.value)) {
            setUsername(e.target.value);
            setErrorName("Escribir solo letras")
          } else {
            setUsername(e.target.value);
            setErrorName("")
          }
          break;
          case e.target.name === "mail":
            if (!/\S+@\S+\.\S+/.test(e.target.value)) {
              setMail(e.target.value);
              setErrorMail("Se requiere un e-mail válido")
            } else {
              setMail(e.target.value);
              setErrorMail("")
            }
            break;
            case e.target.name === "currentP":
                if (e.target.value !== examplePass ) {
                  setCurrentPass(e.target.value);
                  setErrorCurrentP("Clave incorrecta")
                } else {
                  setCurrentPass(e.target.value);
                  setErrorCurrentP("")
                }
                break;
            default:
        console.log("default");
  }
}

    //////////  ---->    on Submit   <------ //////////////
    const onSubmit = (e) => {
        e.preventDefault()
        // dispatch(updateUser({
        //     name: username,
        //     avatar: avatar,
        //     newpass: pass?pass:null,            
        //     mail: mail            
        // }))
        setMSG("Cambios guardados")
        // setTimeout(() => { setMSG("...Going back to Home now") }, 3000);

        // setTimeout(() => { history.push('/home') }, 5000);

    }

    return (
        <div className='formProfile'>
            <form onSubmit={onSubmit}>

                <div className='formName'>
                    <label>Nombre de Usuario:</label>
                    <>
                    <input className={errorName !== "" ? 'danger' : "inputName"} name="name" type="text" value={username} onChange={(e) => validation(e)} />
                    {errorName ? <p className='error'>{errorName}</p> : null}
                    </>
                </div>
                <div className='formMail'>
                    <label>E-Mail:</label>
                    <div>
                    <input className={errorMail !== "" ? 'danger' : "inputEmail"} name="mail" type="text" value={mail} onChange={(e) => validation(e)} />
                    {errorMail ? <p className='error'>{errorMail}</p> : null}
                    </div>
                </div>
                <div className='formAvatar'>
                    <label>Avatar</label>
                    <div>
                    <label>Carrousel de avatars</label>                    
                    </div>
                </div>
               
                <div className='formPass'>
                <div>
                    <div>
                <label>Para cambio de contraseña</label>
                </div>
                    <label>Contraseña actual:</label>
                    <input className={errorCurrentP !== "" ? 'danger' : "inputPass"} name="currentP" type="password" value={currentPass} onChange={(e) => validation(e)} />
                    {errorCurrentP ? <p className='error'>{errorCurrentP}</p> : null}
                </div>
                <div className='formNewPass'>
                    <label>Nueva contraseña:</label>
                    <input className={errorPass !== "" ? 'danger' : "inputPass"} name="newP" type="password" value={pass}  onChange={(e) => validation(e)} />
                    {errorPass ? <p className='error'>{errorPass}</p> : null}
                </div>
                <div className='formConfirmPass'>
                    <label>Confirmar contraseña:</label>
                    <input className={errorPass2 !== "" ? 'danger' : "inputPass"} name="confirmP" type="password" value={pass2}  onChange={(e) => validation(e)} />
                    {errorPass2 ? <p className='error'>{errorPass2}</p> : null}
                </div>
                </div>
                <div className='Profilesubmit'>
                <input disabled={errorName || errorMail} className={errorName ? "disabled" : "enabled"} type="submit" value="Guardar cambios"/>
                </div>
            </form>
        </div>
    );
}
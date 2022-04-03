import React, { useEffect, useState } from "react";
import { firebaseRegistrarUsuario } from "../../../utils/Firebase";
import { useHistory } from "react-router-dom";
import "../../STYLES/singUp.modules.css";
import Perfil from "../../IMG/user.png";
import User from "../../IMG/person.png";
import Email from "../../IMG/email.png";
import Contraseña from "../../IMG/unlock.png";
import { useDispatch } from "react-redux";
import { getAvatars, registerUser } from "../../../redux/actions";
import Avatars from "../../AVATARS/avatars";
import Swal from "sweetalert2";

function SignUpFirebase() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",    
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(1)

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAvatars()) 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  function validar(input) {
    let errors = {};

    if (
      !input.name ||
      !input.email ||
      !input.password
    ) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos',
        heightAuto: false,
      })
    }
    if (input.password.length < 6) {
      errors.password = Swal.fire({
        title: `La contraseña debe contener al menos 6 caracteres`,
        icon: "warning",
        confirmButtonText: "OK",
        heightAuto: false,
        backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
      });
    }
    // if (input.name === "") {
    //   errors.name = Swal.fire({
    //     title: `El nombre de usuario es obligatorio`,
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //     heightAuto: false,
    //     backdrop: `
    //             rgba(0,0,123,0.4)
    //             left top
    //             no-repeat
    //           `,
    //   });
    // }
    // if (input.avatar === "") {
    //   errors.avatar = Swal.fire({
    //     title: `El avatar es obligatorio`,
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //     heightAuto: false,
    //     backdrop: `
    //             rgba(0,0,123,0.4)
    //             left top
    //             no-repeat
    //           `,
    //   });
    // }
    // if (input.email === "") {
    //   errors.email = errors.avatar = Swal.fire({
    //     title: `El email es obligatorio`,
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //     heightAuto: false,
    //     backdrop: `
    //             rgba(0,0,123,0.4)
    //             left top
    //             no-repeat
    //           `,
    //   });
    // }
    return errors;
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    const validacion = validar(input);

    if (Object.keys(validacion).length === 0) {
      dispatch(registerUser({
      name: input.name,    
      email: input.email,
      password: input.password,
      idAvatar: avatar
      }))
      const registrar = await firebaseRegistrarUsuario(
        input.email,
        input.password
      );
      if (registrar.accessToken) {
        localStorage.setItem("email", registrar.email);
        localStorage.setItem("token", registrar.accessToken);
        history.push("/home");
      } else {
        setError({ mensaje: registrar });
      }
    } else {
      setError(() => validacion);
    }
  }

  return (
    <div className="containerSingUp">
      <div className="contentSingUp">
        
        <form onSubmit={handleRegister}>
          <div className="imgUser">
            <img src={Perfil} alt="User" width={60} />
          </div>
          <div className="input">
            <img src={User} alt="User" width={22} />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
          </div>
         
          <div className="input">
            <img src={Email} alt="Email" width={23} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
          </div>
          <div className="input">
            <img src={Contraseña} alt="Contraseña" width={20} />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={input.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="avatarsRegister">
          <Avatars setAvatar={setAvatar}/>
          </div>
          
          <button className="registerButton" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpFirebase;

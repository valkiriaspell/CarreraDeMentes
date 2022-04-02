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

function SignUpFirebase() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAvatars()) 
}, [])

  function validar(input) {
    let errors = {};

    if (input.name === "") {
      errors.name = "El nombre de usuario es obligatorio";
    }
    if (input.avatar === "") {
      errors.avatar = "El avatar es obligatorio";
    }
    if (input.email === "") {
      errors.email = "El email es obligatorio";
    }
    if (input.password.length < 6) {
      errors.password = "La contraseña debe contener al menos 6 caracteres";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    const validacion = validar(input);

    if (Object.keys(validacion).length === 0) {
      dispatch(registerUser({...input}))
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
              placeholder="name"
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
          
          <button type="submit">Registrarse</button>
        </form>
      </div>
      {error.name && <p>{error.name}</p>}
      {error.avatar && <p>{error.avatar}</p>}
      {error.email && <p>{error.email}</p>}
      {error.password && <p>{error.password}</p>}
      {error.mensaje && <p>{error.mensaje}</p>}
    </div>
  );
}

export default SignUpFirebase;

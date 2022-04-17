import React, { useEffect, useState } from "react";
import {
  firebaseRegistrarUsuario,
  firebaseVerificarUsuario,
} from "../../../utils/Firebase";
import { useHistory } from "react-router-dom";
import "../../STYLES/singUp.modules.css";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Perfil from "../../IMG/users.png";
import User from "../../IMG/person.png";
import Email from "../../IMG/email.png";
import Contraseña from "../../IMG/unlock.png";
import { useDispatch } from "react-redux";
import { addCoins, getAvatars, registerUser } from "../../../redux/actions";
import Avatars from "../../AVATARS/avatars";
import Swal from "sweetalert2";
import Music from "../../MUSICA/musica";

function SignUpFirebase() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(1);

  const [error, setError] = useState({});
  const [errorName, setErrorName] = useState("");

  useEffect(() => {
    dispatch(getAvatars());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validar(input) {
    let errors = {};

    if (!input.name || !input.email || !input.password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes completar todos los campos",
        heightAuto: false,
      });
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

    return errors;
  }

  function handleChange(e) {
    if (e.target.name === "name" && e.target.value.length > 16) {
      setInput({ ...input, [e.target.name]: e.target.value });
      setErrorName("Máximo 16 caracteres")
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
      setErrorName("")
      }
      setInput({ ...input, [e.target.name]: e.target.value });    
  }


  async function handleRegister(e) {
    e.preventDefault();
    const validacion = validar(input);

    if (Object.keys(validacion).length === 0) {
      dispatch(
        registerUser({
          name: input.name,
          email: input.email,
          password: input.password,
          idAvatar: avatar,
        })
      );
      const registrar = await firebaseRegistrarUsuario(
        input.email,
        input.password
      );
      if (registrar.accessToken) {
        const verificarEmail = await firebaseVerificarUsuario(registrar);
        Swal.fire({
          icon: "success",
          title:
            "Te mandamos un email para verificar tu cuenta, por favor revisa tu bandeja de entrada",
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        });
        history.push("/login");
      } else {
        setError({ mensaje: registrar });
      }
    } else {
      setError(() => validacion);
    }
  }

  return (
    <div>
       <Music/>
    <div className="containerSingUp">
      <div className="logoSingUp">
        <img
          width="220px"
          src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4"
          alt="Logo"
        ></img>
      </div>
      <div className="contentSingUp">
        <div className="volverSingUp">
          <NavLink style={{ textDecoration: "none" }} to={"/login"}>
            <button className="buttonVolver">
              <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} /> Volver
            </button>
          </NavLink>
        </div>

        <form onSubmit={handleRegister}>
            {errorName? <span>{errorName}</span>: null}
            <br></br>
          <div className="userImg">
            <img src={Perfil} alt="User" width={60} />
          </div>
          <div className="cotainerInput">
            <img src={User} alt="User" width={22} />
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              value={input.name}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
          </div>

          <div className="cotainerInput">
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
          <div className="cotainerInput">
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
            <Avatars setAvatar={setAvatar} />
          </div>
          <button disabled={errorName} className="registerButton" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SignUpFirebase;

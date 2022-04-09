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
  const [avatar, setAvatar] = useState(1);

  const [error, setError] = useState({});

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
    <div className="containerSingUp">
      <div className="logoSingUp">
        <img
          width="220px"
          src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Fzooper-logo.png?alt=media&token=d211e20b-1313-420f-91a8-aa791a6aae3c"
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
          <div className="userImg">
            <img src={Perfil} alt="User" width={60} />
          </div>
          <div className="cotainerInput">
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

          <button className="registerButton" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpFirebase;

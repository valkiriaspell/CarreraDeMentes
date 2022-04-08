import React, { useState } from "react";
import { firebaseRecuperarContrasena } from "../../../utils/Firebase";
import "../../STYLES/recuperarContraseña.modules.css";
import User from "../../IMG/users.png";
import Email from "../../IMG/email.png";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";

function RecuperarContrasena() {
  const [input, setInput] = useState({
    email: "",
  });

  async function handleClick(e) {
    e.preventDefault();
    const test = await firebaseRecuperarContrasena(input.email);
    Swal.fire({
      icon: "success",
      title:
        "Te mandamos un email para que recuperes tu contraseña, por favor revisa tu bandeja de entrada",
      showConfirmButton: false,
      heightAuto: false,
      timer: 3000,
    });
    console.log(test);
  }

  return (
    <div className="containerReContraseña">
      <div className="contentVolver">
        <NavLink style={{ textDecoration: "none" }} to={"/login"}>
          <button className="buttonVolver">
            <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} /> Volver
          </button>
        </NavLink>
        <img
          width="220px"
          src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Fzooper-logo.png?alt=media&token=d211e20b-1313-420f-91a8-aa791a6aae3c"
          alt="Logo"
        ></img>
      </div>
      <form className="contentReContraseña" onSubmit={handleClick}>
        <div>
          <img src={User} alt="User" width={60} className="imgProfile" />
        </div>
        <div>
          <img src={Email} alt="Email" width={22} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
}

export default RecuperarContrasena;

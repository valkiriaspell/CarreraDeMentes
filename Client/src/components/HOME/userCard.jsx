import React from "react";
import "../STYLES/home.modules.css";
import Avatar from "../IMG/avatar.png"
import Nivel from "../IMG/level.png"
import Monedas from "../IMG/coin.png"

function UserCard() {
    
  return (
    <div className="infoUser">
      <div className="avatarCard">
        <img src={Avatar} alt="Avatar" width={50} />
        <span>User97</span>
      </div>
      <div className="nameUser">
        <span><img src={Nivel} alt="Nivel" width={20} /> 7</span>
        <span><img src={Monedas} alt="Monedas" width={20}/> 400</span>
      </div>
    </div>
  );
}

export default UserCard;

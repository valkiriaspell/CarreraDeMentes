import React from "react";
import "../STYLES/home.modules.css";

function UserCard() {
    
  return (
    <div className="infoUser">
      <div>
        <h4>Avatar</h4>
      </div>
      <div className="nameUser">
        <span>User97</span>
        <span>Nivel: 7</span>
        <span>Monedas: 400</span>
      </div>
    </div>
  );
}

export default UserCard;

import React, { useEffect, useState } from 'react';
import "../STYLES/home.modules.css";
import axios from 'axios';

function UserCard({location}) {

  const [monedas, setMonedas] = useState(0);

  //GET para saber el estado del pago, si fue aprobado agregar las monedas al usuario en la bd
  useEffect(() => {
    (async function fetchData(){
      if(location.search !== ''){
        const respuesta = await axios.get(`http://localhost:3001/mercadopago/${location.search}`);
        console.log(respuesta.data)

        if(respuesta.data.status === 'approved'){
          setMonedas(2500) //insertar el valor de la compra en el usuario de la bd
        }
      }  
    }())
  } , [location])

  return (
    <div className="infoUser">
      <div>
        <h4>Avatar</h4>
      </div>
      <div className="nameUser">
        <span>User97</span>
        <span>Nivel: 7</span>
        <span>Monedas: {monedas}</span>
      </div>
    </div>
  );
}

export default UserCard;

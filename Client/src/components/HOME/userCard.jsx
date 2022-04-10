import React, { useEffect } from 'react';
import "../STYLES/home.modules.css";
import Nivel from "../IMG/level.png"
import Monedas from "../IMG/coin.png"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions';
import Swal from 'sweetalert2';

function UserCard({location}) {
  const {user} = useSelector(state => state);
  const dispatch = useDispatch()
  const email = localStorage.getItem("email");

  //GET para saber el estado del pago, si fue aprobado agregar las monedas al usuario en la bd
  useEffect(() => {
    (async function fetchData(){
      if(location.search !== ''){
        const respuesta = await axios.post(`/mercadopago${location.search}`, {email: email});
        dispatch(loginUser(email))
        Swal.fire({
          icon: `${respuesta.data.icon}`,
          title:
            `${respuesta.data.mensaje}`,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        });
      }  
    }())
  } , [location])

  useEffect(() =>{
      dispatch(loginUser(email))
      console.log(user)
  }, [])

  return (
    <div className="infoUser">
      <div className="avatarCard">
        <img src={user?.avatars?.[0]?.imageUrl} alt="Avatar" width={50} />
        <span>{user?.name}</span>
      </div>
      <div className="nameUser">
        <span><img src={Nivel} alt="Nivel" width={20} />{user?.level}</span>
        <span><img src={Monedas} alt="Monedas" width={20}/>{user?.coins}</span>
      </div>
    </div>
  );
}

export default UserCard;

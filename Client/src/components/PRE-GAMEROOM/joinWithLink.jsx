import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { listUsersInPreRoom, loginUser } from "../../redux/actions"
import { AddUserToPreRoom } from "./utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import s from '../STYLES/preGameRoom.module.css'

function JoinWithLink({match}){
    const {idRoom} = match.params;
    const dispatch = useDispatch()
    const history = useHistory()
    const {user} = useSelector(state => state)
    const email = localStorage.getItem("email");

    useEffect(()=>{
        dispatch(loginUser(email))
        .then((data)=> !data.id && history.push("/"))
    }, [])
    
    async function handleJoinRoom(e){
        AddUserToPreRoom({idRoom, idUser: user.id})
        .then(()=> dispatch(listUsersInPreRoom(idRoom)))
        .then(() => history.push(`/room/${idRoom}`))
        .catch((error)=> alert(error)) // mejorar alerta
    }
    return (
        <div className={s.containerInvitation}>
          <div className={s.containerButtons} >
            <Link style={{ textDecoration: "none" }} to="/home">
              <button className="buttonSides lowgreen" >
                <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} />
                Volver
              </button>
            </Link>
            <button onClick={(e) => handleJoinRoom(e)} className='buttonSides brown'>
              Unirse
            </button>
          </div>
        </div>
    )
}

export default JoinWithLink;
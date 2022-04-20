import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { listUsersInPreRoom, loginUser } from "../../redux/actions"
import { AddUserToPreRoom } from "../PRE-GAMEROOM/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import s from '../STYLES/invitation.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        .catch((e)=> toast.warn(e, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }))
    }
    return (
        <div className={s.containerInvitation}>
          <div className={s.logo} >
          <img src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo5.png?alt=media&token=5e5bb88d-806a-4c38-b667-b27a9b5b01fc"></img>
          </div>
          <div className={s.containerButtons} >
            <Link style={{ textDecoration: "none" }} to="/home">
              <button className="buttonSides lowgreen" style={{fontSize: "1.5rem", transform: "skew(-7deg, 0deg)"}} >
                <AiOutlineArrowLeft style={{ marginRight: "0.4rem" }} />
                Volver
              </button>
            </Link>
            <button onClick={(e) => handleJoinRoom(e)} className='buttonSides brown' style={{fontSize: "2rem", width: "10.2rem", transform: "skew(-7deg, 0deg)"}}>
              Unirse
            </button>
          </div>
          <ToastContainer />
        </div>
    )
}

export default JoinWithLink;
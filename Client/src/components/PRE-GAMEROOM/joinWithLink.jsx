import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { listUsersInPreRoom, loginUser } from "../../redux/actions"
import { AddUserToPreRoom } from "./utils";

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
        .then(() => {
            history.push(`/room/${idRoom}`)})
    }
    return (
        <button onClick={(e) => handleJoinRoom(e)} >Unirse</button>
    )
}

export default JoinWithLink;
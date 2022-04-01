import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { AddUserToPreRoom, listUsersInPreRoom, deleteUserFromRoom, setReady } from "../../redux/actions";
import s from '../STYLES/preGameRoom.module.css'
import axios from "axios";

function useChatSocketIo(idGameRoom) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);

    const [messages, setMessages] = useState([]);
    const socketIoRef = useRef();
    const [game, setGame] = useState(false)

    useEffect(() =>{
        //create web socket connection
        socketIoRef.current = socketIOClient('http://localhost:3001', {idGameRoom, email: user.email});
            const newUserInRoom = () =>{
                dispatch(AddUserToPreRoom({
                    idGameRoom,
                    email: user.email,
                }))
                .then(() => dispatch(listUsersInPreRoom(idGameRoom)))
            }
            newUserInRoom();

            //received a new message, differentiating which are from current user and add to message list
            socketIoRef.current.on("NEW_MESSAGE", message =>{
                const incomingMessage = {
                    ...message,
                    writtenByCurrentUser: message.id === socketIoRef.current.id
                }
                setMessages([...messages, incomingMessage])
            })

            //change readyState from user to click in button
            socketIoRef.current.on("READY", ({email}) =>{
                const buttonReady = document.getElementById(email)
                if(buttonReady.className === s.active){
                    buttonReady.className = s.inactive;
                    dispatch(setReady(email))
                } else {
                    buttonReady.className = s.active;
                }
            })

            socketIoRef.current.on("NEW_CONNECTION", () =>{
                dispatch(listUsersInPreRoom(idGameRoom));
            })
            
            socketIoRef.current.on("DISCONNECT", () =>{
                dispatch(listUsersInPreRoom(idGameRoom));
            })

            socketIoRef.current.on("EXPEL_PLAYER", (email) =>{
                user.email === email && history.push('/home')
            })

            //when host press start-game button, all players redirect url game-room, 
            socketIoRef.current.on("START", () =>{
                setGame(true)
            })
           

            //remove player from room (DB) when player leaves the room and destroy the socket reference
            return () =>{
                axios.delete(`/ruta para hacer delete/:email`)
                .then(() =>{
                    socketIoRef.current.emmit("DISCONNECT")
                    socketIoRef.current.disconnect();
                })
            }
    }, [idGameRoom])

    //send a message to all players in chat
    function sendMessage(message){
        socketIoRef.current.emit("NEW_MESSAGE", {
            text: message,
            name: user.name
        })
    }

    function sendReady(){
        socketIoRef.current.emit("READY", {email: user.email})
    }

    function sendStartGame(){
        socketIoRef.current.emit("START")
    }

    function expelPlayer(e){
        socketIoRef.current.emit("EXPEL_PLAYER", e.target.id)
    }

    return { messages, sendMessage, sendReady, sendStartGame, game, expelPlayer}
}

export default useChatSocketIo;
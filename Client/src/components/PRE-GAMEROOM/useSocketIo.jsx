import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { AddUserToPreRoom, listUseresInPreRoom, deleteUserFromRoom, setReady } from "../../redux/actions";
import s from '../STYLES/preGameRoom.module.css'
import axios from "axios";

function useChatSocketIo(idGameRoom) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);

    const [messages, setMessages] = useState([]);
    const socketIoRef = useRef();
    let stateGame;

    useEffect(() =>{
        //create web socket connection
        socketIoRef.current = socketIOClient('http://localhost:3001', {idGameRoom, email: user.email});
            const newUserInRoom = () =>{
                dispatch(AddUserToPreRoom({
                    idGameRoom,
                    email: user.email,
                }))
                .then(() => dispatch(listUseresInPreRoom(idGameRoom)))
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
                dispatch(listUseresInPreRoom(idGameRoom));
            })
            
            socketIoRef.current.on("DISCONNECT", () =>{
                dispatch(listUseresInPreRoom(idGameRoom));
            })

            //when host press start-game button, all players redirect url game-room, 
            socketIoRef.current.on("START", () =>{
                stateGame = true
            })
           

            //destroy the socket reference when player leaves the room
            return () =>{
                axios.delete(`/ruta para hacer post a una sala/:email`)
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

    return { messages, sendMessage, sendReady, sendStartGame, stateGame}
}

export default useChatSocketIo;
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { AddUserToPreRoom, listUsersInPreRoom, deleteUserFromRoom, setReady, loginUser } from "../../redux/actions";
import s from '../STYLES/preGameRoom.module.css'
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import readyDark from "../IMG/readyDark.png"

function useChatSocketIo(idGameRoom) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    
    const [messages, setMessages] = useState({});
    const socketIoRef = useRef();
    const [game, setGame] = useState(false)
    const email = localStorage.getItem("email");
    const [image, setImage] = useState(readyDark)
    useEffect(() =>{
        //create web socket connection
        const newUserInRoom = () =>{
            !user.name && dispatch(loginUser(email))
            .then((data) => dispatch(AddUserToPreRoom({
                idGameRoom, 
                idUser: data?.id
            })))
            .then((idD) =>dispatch(listUsersInPreRoom(idD)))
            .then(() => console.log('listo'))
        }
        !user.host && newUserInRoom();
        console.log('idGameRoom: ', idGameRoom)
        socketIoRef.current = socketIOClient('http://localhost:3001',{query:{idGameRoom, email: user.email} } );

            socketIoRef.current.on("NEW_CONNECTION", (email) =>{
                email !== user.email &&
                dispatch(listUsersInPreRoom(idGameRoom));
            })
            
            //received a new message, differentiating which are from current user and add to message list
            socketIoRef.current.on("NEW_MESSAGE", message =>{
                console.log(user) //no quitar
                console.log(user.email, message.email)
                const incomingMessage = { // no recibo el message.id
                    ...message,
                    writtenByCurrentUser: message.email === user.email
                }
                setMessages(incomingMessage)
            })

            //change readyState from user to click in button
            socketIoRef.current.on("READY", ({id}) =>{
                const imgReady = document.getElementById(id)
                
                if(imgReady.src === readyDark){
                    /* dispatch(setReady(id)) */
                    setImage(readyGreen);
                } else {
                    setImage(readyDark);
                }
            })

            
            socketIoRef.current.on("DISCONNECT", () =>{
                dispatch(listUsersInPreRoom(idGameRoom));
            })

            socketIoRef.current.on("EXPEL_PLAYER", (id) =>{
                user.id === id && history.push('/home')
            })

            //when host press start-game button, all players redirect url game-room, 
            socketIoRef.current.on("START", () =>{
                setGame(true)
            })
           

            //remove player from room (DB) when player leaves the room and destroy the socket reference
            return () =>{
                axios.put('http://localhost:3001/gameRoom', {idGameRoom, idUserDelet: user.id})
                .then(() =>{
                    socketIoRef.current.emmit("DISCONNECT")
                    socketIoRef.current.disconnect();
                })
            }
    }, [])

    //send a message to all players in chat
    function sendMessage(message){
        console.log("hola") //no quitar
        socketIoRef.current.emit("NEW_MESSAGE", {
            text: message, 
            name: user?.name,
            email: user?.email,
        })
    }

    function sendReady(){
        socketIoRef.current.emit("READY", {id: user.id})
    }

    function sendStartGame(){
        socketIoRef.current.emit("START")
    }

    function expelPlayer(e){
        let id = e.target.id
        socketIoRef.current.emit("EXPEL_PLAYER", id)
    }

    return { messages, sendMessage, sendReady, sendStartGame, game, expelPlayer, image}
}

export default useChatSocketIo;
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { listUsersInPreRoom, loginUser, getReadyUser } from "../../redux/actions";
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import { changeReady, deleteRoom, AddUserToPreRoom } from "./utils";

function useChatSocketIo(idGameRoom) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user, preRoomUsers} = useSelector(state => state);
    
    const socketIoRef = useRef();
    const email = localStorage.getItem("email");
    const [messages, setMessages] = useState({});
    const [game, setGame] = useState(false)
    const [roomConfiguration, setRoomConfiguration] = useState({
        time: preRoomUsers.time,
        category: preRoomUsers.category,
        questions: preRoomUsers.questionAmount,
        open: preRoomUsers.public_
    })

    useEffect(() =>{
        //create web socket connection
        const newUserInRoom = async () =>{
            console.log("principio", user)
            await dispatch(loginUser(email))
            .then((data) => dispatch(AddUserToPreRoom({
                idGameRoom,
                idUser: data?.id
            })))
            .then((idD) =>dispatch(listUsersInPreRoom(idD)))
            .then(() => console.log('listo'))
        }
        !user?.host && newUserInRoom();
        /* console.log('idGameRoom: ', idGameRoom) */
        socketIoRef.current = socketIOClient('',{query:{idGameRoom, email: user?.email} } );
            console.log("connect", user)
            socketIoRef.current.on("NEW_CONNECTION", async (email) =>{
                email !== user.email &&
                dispatch(listUsersInPreRoom(idGameRoom));
            })
            
            //received a new message, differentiating which are from current user and add to message list
            socketIoRef.current.on("NEW_MESSAGE", message =>{
                /* console.log(user) //no quitar
                console.log(user.email, message.email) */
                const incomingMessage = { // no recibo el message.id
                    ...message,
                    writtenByCurrentUser: message.email === email
                }
                setMessages(incomingMessage)
            })

            //change readyState from user to click in button
            socketIoRef.current.on("READY", ({id}) =>{
                dispatch(getReadyUser(id))
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
            
            socketIoRef.current.on("CONFIG_ROOM", (roomConfiguration) =>{
                
                setRoomConfiguration(roomConfiguration)
            })

/*             socketIoRef.current.on("NEW_EVENT", (UsersPoint) =>{
                dispatch(changePoint(UsersPoint))
            }) */
           

            //remove player from room (DB) when player leaves the room and destroy the socket reference
            return () =>{
                console.log(preRoomUsers?.users?.length)
                preRoomUsers?.users?.length === 1
                    ? deleteRoom({id: idGameRoom})
                    : axios.put('/gameRoom/delete', {idGameRoom, idUserDelet: user.id})
                    .then(() =>{
                        socketIoRef?.current?.emmit("DISCONNECT")
                        socketIoRef?.current?.disconnect();
                    })
            }
    }, [])

    //send a message to all players in chat
    function sendMessage(message){
        console.log("hola", user) //no quitar
        socketIoRef.current.emit("NEW_MESSAGE", {
            text: message, 
            name: user?.name,
            email: user?.email,
        })
    }

    //when someone press ready, find de element with yours id,
    //and change the ready prop, if it is true change to false
    async function sendReady(){
        const imgReady = document.getElementById(user.id)
        imgReady.src === readyGreen
        ? await changeReady(user.id, false)
        : await changeReady(user.id, true)
        socketIoRef.current.emit("READY", {id: user.id})
    }

    function sendStartGame(){
        socketIoRef.current.emit("START")
    }

    function expelPlayer(e){
        let id = e.target.id
        socketIoRef.current.emit("EXPEL_PLAYER", id)
    }
    
    async function handleSubmitConfig(e, roomConfiguration){
        e.preventDefault()
        try{
            const {data} = await axios.put('/gameRoom', {
                idRoom: idGameRoom, 
                public_: roomConfiguration.open, 
                questions: roomConfiguration.questions,
                category: roomConfiguration.category,
                time: roomConfiguration.time})
                console.log(data)
        } catch(e){
            console.log(e)
        }
        socketIoRef.current.emit("CONFIG_ROOM", roomConfiguration)
    }

/*     function positions(e){
        dispatch(changePoint(UsersPoint))
        socketIoRef.current.emit("NEW_EVENT", UsersPoint)
    } */

    return { messages, 
            sendMessage, 
            sendReady, 
            sendStartGame, 
            game, 
            expelPlayer, 
            handleSubmitConfig, 
            roomConfiguration, 
            setRoomConfiguration}
}

export default useChatSocketIo;
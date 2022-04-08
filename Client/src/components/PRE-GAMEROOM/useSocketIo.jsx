import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { listUsersInPreRoom, loginUser, getReadyUser, modifyHost, modifyHostById, removeUser, fastChangeHostRoom } from "../../redux/actions";
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import { changeReady, deleteRoom, AddUserToPreRoom } from "./utils";

function useChatSocketIo(idRoom) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {user, preRoomUsers} = useSelector(state => state);
    
    const socketIoRef = useRef();
    const email = localStorage.getItem("email");
    const [messages, setMessages] = useState({});
    const [game, setGame] = useState(false)
    const [roomConfiguration, setRoomConfiguration] = useState({
        time: preRoomUsers?.time,
        category: preRoomUsers?.category,
        questions: preRoomUsers?.questionAmount,
        open: preRoomUsers?.public_
    })

    useEffect(() =>{
        //create web socket connection
        /* const {preRoomUsers} = useSelector(state => state); */
        const newUserInRoom = () =>{
            /* console.log("principio", user) */
            dispatch(loginUser(email))
            .then((data) => dispatch(AddUserToPreRoom({
                idRoom,
                idUser: data?.id,
                avatar: data?.avatars?.[0]?.imageUrl
            })))
            .then((idD) =>dispatch(listUsersInPreRoom(idD)))
            .then(() => console.log('listo'))
        }
        !user?.host && newUserInRoom();

        socketIoRef.current = socketIOClient('http://localhost:3001',{query:{idGameRoom: idRoom, email: user?.email} } );
            /* console.log("connect", user) */
            socketIoRef.current.on("NEW_CONNECTION", async (email) =>{
                email !== user.email &&
                dispatch(listUsersInPreRoom(idRoom));
            })
            
            //received a new message, differentiating which are from current user and add to message list
            socketIoRef.current.on("NEW_MESSAGE", message =>{
                const incomingMessage = { 
                    ...message,
                    writtenByCurrentUser: message.email === email
                }
                setMessages(incomingMessage)
            })

            //change readyState from user to click in button
            socketIoRef.current.on("READY", ({id}) =>{
                dispatch(getReadyUser(id))
            })
            
            socketIoRef.current.on("DISCONNECT", (id) =>{
                console.log('id host', id)
                preRoomUsers?.users?.[0] === id 
                    ? history.push('/home')
/*                     ? preRoomUsers?.users?.[1] === user.id &&
                        dispatch(modifyHost(email, true)) */
                /* dispatch(fastChangeHostRoom(id)) */
                    : dispatch(listUsersInPreRoom(idRoom))
            })

            socketIoRef.current.on("EXPEL_PLAYER", ({id, arrayRemoveUser}) =>{
                user?.id === id 
                    ? history.push('/home')
                    : dispatch(removeUser(arrayRemoveUser))
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
            return async () =>{

                /* let data = await dispatch(listUsersInPreRoom(idRoom))
                if(!user.id){
                    user.id = data.users[0].id */
                    /* data.users.length === 1 */
                
                    preRoomUsers?.users?.length === 1
                    ? dispatch(modifyHost(email, false)) && deleteRoom({idRoom: idRoom}) && socketIoRef?.current?.emmit("DISCONNECT", preRoomUsers?.users?.[0].id)
                    : await deleteUser()
                    .then(()=>{
                        console.log('estoy aca')
                        dispatch(modifyHost(email, false)) 
                        /* preRoomUsers.users.find(user => user.host === true) */
                        /* dispatch(modifyHostById((!preRoomUsers.users[0].host ? preRoomUsers.users[0].id : preRoomUsers.users[1].id), true)) */
                    })
                    socketIoRef?.current?.emmit("DISCONNECT", user?.id)
                    socketIoRef?.current?.disconnect();
            }
    }, [])

async function deleteUser(){
    try{
        await axios.put('http://localhost:3001/gameRoom/delete', {idRoom, idUserDelet: user.id})
    }catch(e){
        console.log(e)
    }
}

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

    async function expelPlayer(e){
        let id = e.target.id
        try{
            const userRemove = await axios.put('http://localhost:3001/gameRoom/delete', {idRoom, idUserDelet: id})
            const arrayRemoveUser = preRoomUsers?.users?.filter(user=> user?.id !== id)
            socketIoRef.current.emit("EXPEL_PLAYER", {id, arrayRemoveUser})
        }catch(e){
            console.log(e)
        }
    }
    
    async function handleSubmitConfig(e, roomConfiguration){
        e.preventDefault()
        try{
            const {data} = await axios.put('http://localhost:3001/gameRoom/config', {
                idRoom, 
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
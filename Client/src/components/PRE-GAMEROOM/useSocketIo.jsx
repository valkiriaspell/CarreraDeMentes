import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { listUsersInPreRoom, loginUser, getReadyUser, modifyHost, modifyHostById, changePoint } from "../../redux/actions";
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import { changeReady, deleteRoom, AddUserToPreRoom, getUrl } from "./utils";

function useChatSocketIo(idRoom) {
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
        const newUserInRoom = () =>{
            console.log("principio", user)
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
        /* console.log('idRoom: ', idRoom) */
        socketIoRef.current = socketIOClient('http://localhost:3001',{query:{idGameRoom: idRoom, email: user?.email} } );
            console.log("connect", user)
            socketIoRef.current.on("NEW_CONNECTION", async (email) =>{
                email !== user.email &&
                dispatch(listUsersInPreRoom(idRoom));
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
                dispatch(listUsersInPreRoom(idRoom))
            })

            socketIoRef.current.on("EXPEL_PLAYER", (id) =>{
                console.log("expel", user, id)
                user?.id === id && history.push('/home')
                /* window.location.reload(); */
            })

            //when host press start-game button, all players redirect url game-room, 
            socketIoRef.current.on("START", () =>{
                dispatch(listUsersInPreRoom(idRoom))
                setGame(true)
            })
            
            socketIoRef.current.on("CONFIG_ROOM", (roomConfiguration) =>{
                
                setRoomConfiguration(roomConfiguration)
            })

             socketIoRef.current.on("NEW_EVENT", ({id, pointsTotal, point}) =>{
                dispatch(changePoint({id, pointsTotal, point}))
            }) 
           

            //remove player from room (DB) when player leaves the room and destroy the socket reference
            // return () =>{
            //     dispatch(modifyHost(email, false))
            //     preRoomUsers?.users?.length === 1
            //         ? deleteRoom({idRoom: idRoom})
            //         : axios.put('http://localhost:3001/gameRoom/delete', {idRoom: idRoom, idUserDelet: user.id})
            //         .then(()=>dispatch(modifyHostById(preRoomUsers.users[0].id, true))) 
            //         .then(() =>{
            //             socketIoRef?.current?.emmit("DISCONNECT")
            //             socketIoRef?.current?.disconnect();
            //         })
            // }
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

  async  function sendStartGame(){
      const questionAll = await axios.post("http://localhost:3001/question/allQuestions", {
        count: preRoomUsers.questionAmount,
        category: preRoomUsers.category,
        idRoom
    })
      console.log(questionAll);
        socketIoRef.current.emit("START")
    }

    function expelPlayer(e){
        let id = e.target.id
        console.log("delete id", id)
        socketIoRef.current.emit("EXPEL_PLAYER", id)
    }
    
    async function handleSubmitConfig(e, roomConfiguration){
        e.preventDefault()
        try{
            const {data} = await axios.put('http://localhost:3001/gameRoom/config', {
                idRoom: idRoom, 
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

    function positions(id, pointsTotal, point){
        socketIoRef.current.emit("NEW_EVENT", {id, pointsTotal, point})
    } 

    return { messages, 
            sendMessage, 
            sendReady, 
            positions,
            sendStartGame, 
            game, 
            expelPlayer, 
            handleSubmitConfig, 
            roomConfiguration, 
            setRoomConfiguration}
}

export default useChatSocketIo;
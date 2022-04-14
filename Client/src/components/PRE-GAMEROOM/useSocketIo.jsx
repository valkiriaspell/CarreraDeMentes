import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { listUsersInPreRoom, loginUser, getReadyUser, changePoint, removeUser, fastRemove } from "../../redux/actions";
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import { changeReady, deleteRoom, AddUserToPreRoom, startGame, modifyHost, removeUserRoom } from "./utils";

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
    const [points, setPoints] = useState({});
    const [everybodyPlays, setEverybodyPlays] = useState(false);
    useEffect(() =>{
        //create web socket connection
/*         const newUserInRoom = async () =>{
            const data = await dispatch(loginUser(email))
            !data?.id && history.push('/')
            console.log(data)
            const idD = await AddUserToPreRoom({
                idRoom,
                idUser: data?.id,
            })
            dispatch(listUsersInPreRoom(idRoom));
            console.log(idD)
        }
        !user?.id && newUserInRoom(); */
        console.log(socketIoRef)
        socketIoRef.current = socketIOClient('http://localhost:3001',{query:{idGameRoom: idRoom, email} } );
        console.log(socketIoRef)
            socketIoRef.current.on("NEW_CONNECTION", (email) =>{
                console.log('NEW_CONNECTION')
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
                console.log(id)
                id === user.id && socketIoRef?.current?.disconnect();
                const isHost = preRoomUsers?.users?.filter(us=> us.id === id )
                if(isHost[0]?.host){
                    history.push('/home');
                    socketIoRef?.current?.disconnect();
                } else{
                    dispatch(listUsersInPreRoom(idRoom))
                }
                    /* preRoomUsers?.users?.[1] === user.id && */
                        /* modifyHost(email, true)  */
                /*  dispatch(fastChangeHostRoom(id)) */
            })

            socketIoRef.current.on("EXPEL_PLAYER", ({id, arrayRemoveUser}) =>{
                console.log(id, user.id)
                user?.id === id 
                    ? history.push('/home')
                    : dispatch(removeUser(arrayRemoveUser))
            })

            socketIoRef.current.on("FAST_REMOVE", (id) =>{
                console.log(id)
                id !== user.id &&
                    dispatch(fastRemove(id))
            })

            //when host press start-game button, all players redirect url game-room, 
            socketIoRef.current.on("START", async () =>{
                console.log("empezar")
                await startGame(idRoom, true)
                await dispatch(listUsersInPreRoom(idRoom))
                setGame(true)
            })
            
            socketIoRef.current.on("CONFIG_ROOM", (roomConfiguration) =>{
                
                setRoomConfiguration(roomConfiguration)
            })

            socketIoRef.current.on("NEW_EVENT", ({id, pointsTotal, point, name}) =>{
                console.log('lejos')
                dispatch(changePoint({id, pointsTotal, point}))
                /* (pointsTotal - point) !== 0 &&  */
                setPoints({point, name})
            }) 

            socketIoRef.current.on("ALL_START_GAME", () =>{
                console.log('empiezen!')
                setEverybodyPlays(true)
            }) 
           

            //remove player from room (DB) when player leaves the room and destroy the socket reference

            return async () =>{
                console.log('return')
                /* socketIoRef?.current?.emit("FAST_REMOVE", user?.id) */ // ya volvio a fallar no se por que
                const list = await dispatch(listUsersInPreRoom(idRoom))
                console.log(list, 'que onda')
                if(list?.start === false){
/*                     if(list?.users?.length === 1){
                        modifyHost(email, false)
                        console.log('error de camino')
                        deleteRoom(idRoom)
                         socketIoRef?.current?.disconnect(); 
                    }else{ */
                    if(user?.host === true){
                        await modifyHost(email, false)
                        await deleteRoom(idRoom)
                        console.log("que pasa", socketIoRef)
                    } else{
                        let player = {}
                        if(!user?.id){
                            player = await dispatch(loginUser(email))
                            console.log('estoy aca tambien')
                        }
                        await removeUserRoom(idRoom, user?.id ? user?.id : player?.id)
                        console.log('estoy aca', socketIoRef)
                        console.log("final")
                    }
                    socketIoRef?.current?.emit("DISCONNECT", user.id)
                    console.log("desconectando")
                }
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
    function countReady() {
        const arrayIds = preRoomUsers?.users?.map(user => user.id)
        let readys = 0;
        let imgReady = ""
        for(let i = 0; i < arrayIds?.length; i++){
          imgReady = document.getElementById(arrayIds[i])
          if(imgReady?.src === readyGreen){
            console.log("aqui", readys)
            readys++
          } 
        }
    console.log(readys)
        return readys
      }
    async function sendStartGame(){
        let listos = countReady()
        if(listos === preRoomUsers?.users?.length - 1){
            console.log("startatatat")
            try{
                const questionAll = await axios.post("http://localhost:3001/question/allQuestions", {
                    count: preRoomUsers?.questionAmount,
                    category: preRoomUsers?.category,
                    idRoom
                })
            console.log(questionAll)
            socketIoRef.current.emit("START")
            }catch(e){
                console.log(e)
            }
        }
    }

    function expelPlayer(e){
        let id = e.target.id
        console.log(id)
        const arrayRemoveUser = preRoomUsers?.users?.filter(user=> user?.id !== id)
        socketIoRef.current.emit("EXPEL_PLAYER", {id, arrayRemoveUser})

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

    function positions(id, pointsTotal, point, name){
        console.log('nuevo evento')
        socketIoRef.current.emit("NEW_EVENT", {id, pointsTotal, point, name})
    } 
    function allStartGame(){
        console.log('yaaaa')
        socketIoRef.current.emit("ALL_START_GAME")
    } 


    return { messages, 
            sendMessage, 
            positions,
            sendReady, 
            sendStartGame, 
            game, 
            setGame,
            expelPlayer, 
            handleSubmitConfig, 
            roomConfiguration, 
            setRoomConfiguration,
            points,
            allStartGame,
            everybodyPlays}
}

export default useChatSocketIo;
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from 'socket.io-client';
import { listUsersInPreRoom, loginUser, getReadyUser, modifyHost, changePoint, removeUser, fastRemove } from "../../redux/actions";
import axios from "axios";
import readyGreen from "../IMG/readyGreen2.png"
import { changeReady, deleteRoom, AddUserToPreRoom, startGame } from "./utils";

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
        /* !email && history.push('/') */ //descomentar y probar
        const newUserInRoom = () =>{
            dispatch(loginUser(email))
            .then((data) => dispatch(AddUserToPreRoom({
                idRoom,
                idUser: data?.id,
            })))
            .then((idD) =>dispatch(listUsersInPreRoom(idD)))
        }
        !user?.host && newUserInRoom();

        socketIoRef.current = socketIOClient('',{query:{idGameRoom: idRoom, email} } );
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
                console.log(id)
                preRoomUsers?.users[0].id === id 
                    ? history.push('/home')
                    : dispatch(listUsersInPreRoom(idRoom))
                    /* preRoomUsers?.users?.[1] === user.id && */
                        /* dispatch(modifyHost(email, true))  */
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
                await startGame(idRoom, true)
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
                //acomodar para cuando es solo uno
                /* socketIoRef?.current?.emit("FAST_REMOVE", user?.id) */ // ya volvio a fallar no se por que
                //cuando somos dos sale y elimina la sala, primero entra en el segundo camino,
                //luego pasa al segundo
                //si alguien se sale quitar el nomre de la lista rapido como hago con el de expulsar
                const list = await dispatch(listUsersInPreRoom(idRoom))
                console.log(list, 'que onda')
                if(list?.start === false){
                    /* stateStart() === false && */
                    if(list?.users?.length === 1){
                        dispatch(modifyHost(email, false))
                        console.log('error de camino')
                        deleteRoom(idRoom) 
                        /* socketIoRef?.current?.emit("DISCONNECT", preRoomUsers?.users[0].id) */
                        socketIoRef?.current?.disconnect();
                    }else{
                        if(user?.id){
                            await axios.put('/gameRoom/delete', {idRoom, idUserDelet: user.id})
                            console.log('estoy aca')
                            socketIoRef?.current?.emit("DISCONNECT", user?.id)
                            
                        } else{
                            dispatch(modifyHost(email, false)) 
                            deleteRoom(idRoom) 
                            socketIoRef?.current?.emit("DISCONNECT", preRoomUsers?.users[0].id)

                        }
                        socketIoRef?.current?.disconnect();
                    }
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

    async function sendStartGame(){
        try{
            const questionAll = await axios.post("/question/allQuestions", {
                count: preRoomUsers?.questionAmount,
                category: preRoomUsers?.category,
                idRoom
            })
            console.log(questionAll)
            socketIoRef.current.emit("START")
        }catch(e){
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
            const {data} = await axios.put('/gameRoom/config', {
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
            expelPlayer, 
            handleSubmitConfig, 
            roomConfiguration, 
            setRoomConfiguration,
            points,
            allStartGame,
            everybodyPlays}
}

export default useChatSocketIo;
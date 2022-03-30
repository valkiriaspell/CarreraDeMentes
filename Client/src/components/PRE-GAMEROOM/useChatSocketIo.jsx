import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';
import { AddUserToPreRoom, listUseresInPreRoom, setReady } from "../../redux/actions";

function useChatSocketIo(idGameRoom) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);

    const [messages, setMessages] = useState([]);
    const socketIoRef = useRef();

    useEffect(() =>{
        //create web socket connection
        socketIoRef.current(socketIOClient('http://localhost:3001/socket', {query: {idGameRoom, email: user.email}}));
            const newUserInRoom = () =>{
                dispatch(AddUserToPreRoom({
                    idGameRoom,
                    idSocket: socketIoRef.current.id,
                    usename: user.usename,
                    email: user.email,
                    avatar: user.avatar,
                    ready: false
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
                dispatch(setReady(email))
            })

            //destroy the socket reference when player leaves the room
            return () =>{
                socketIoRef.current.disconnect();
            }
    }, [idGameRoom])

    //send a message to all players in chat
    function sendMessage(message){
        socketIoRef.current.emit("NEW_MESSAGE", {
            text: message,
            id: socketIoRef.current.id
        })
    }

    function sendReady(){
        socketIoRef.current.emit("READY", {email: user.email})
    }

    return { messages, sendMessage, sendReady}
}

export default useChatSocketIo;

//action ingresarsala => post mail, idSala presala

//cuando llege new connection
//hacer get => idSala me traigo los users(emails)

//cuando aprete ready hago un socketIOClient.emit(ready, email del usuario)

//cuando reciba un ready con un email ponerlo en verde a ese usuario
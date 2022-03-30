import { useEffect, useRef, useState } from "react";
import socketIOClient from 'socket.io-client';

function useChatSocketIo(idGameRoom) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const socketIoRef = useRef();

    useEffect(() =>{
        //create web socket connection
        socketIoRef.current(socketIOClient('http://localhost:3001/socket', {query: idGameRoom}));

        //received a new message, differentiating which are from current user and add to message list
        socketIoRef.current.on("NEW_MESSAGE", message =>{
            const incomingMessage = {
                ...message,
                writtenByCurrentUser: message.id === socketIoRef.current.id
            }
            setMessages([...messages, incomingMessage])
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

    return { messages, sendMessage}
}

export default useChatSocketIo;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSocket from './useSocketIo'

const Chat = ({idGameRoom}) =>{
    const {messages, sendMessage} = useSocket(idGameRoom);
    const [newMessage, setNewMessage] = useState("");
    const {preRoomUsers} = useSelector(state => state)
    function handleMessage(e){
        setNewMessage(e.target.value)
    }

    function handleSendMessage(e){
        sendMessage(newMessage);
        setNewMessage("");
    }


    return (
        <div>
            <p>jugadores {preRoomUsers?.length}/6</p>
            <div>
                <ol>
                    {
                        messages.map((message, index) => {
                            return (
                                <li key={index}>
                                    {
                                        message.writtenByCurrentUser
                                            ? `Me: ${message.text}` 
                                            : `${message.name}: ${message.text}`
                                    }
                                </li>
                            )
                        })
                    }

                </ol>
                <div>
                    <input type="text" placeholder="escribe un mensaje..." value={newMessage} onChange={handleMessage}/>
                    <button onClick={e => handleSendMessage(e)} >Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
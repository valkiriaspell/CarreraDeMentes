import React, { useState } from "react";
import { useSelector } from "react-redux";
import useChat from './useChatSocketIo'

const Chat = ({idGameRoom}) =>{
    const {messages, sendMessage} = useChat(idGameRoom);
    const [newMessage, setNewMessage] = useState("");
    const {users} = useSelector(state => state)
    function handleMessage(e){
        setNewMessage(e.target.value)
    }

    function handleSendMessage(e){
        sendMessage(newMessage);
        setNewMessage("");
    }

    return (
        <div>
            <p>jugadores {users.length}/6</p>
            <div>
                <ol>
                    {
                        messages.map((message, index) => {
                            return (
                                <li key={index}>
                                    {
                                        message.writtenByCurrentUser
                                            ? `Me: ${message.text}` // ver si funciona bien
                                            : `${message.id}: ${message.text}`
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
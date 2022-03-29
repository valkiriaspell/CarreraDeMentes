import React, { useState } from "react";
import useChat from './useChatSocketIo'

const Chat = ({idGameRoom}) =>{
    const {messages, sendMessage, users} = useChat(idGameRoom);
    const [newMessage, setNewMessage] = useState("");

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
                                            ? `Me: ${message.text}`
                                            : `${"usuario que envio el mensaje"} :${message.text}`
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
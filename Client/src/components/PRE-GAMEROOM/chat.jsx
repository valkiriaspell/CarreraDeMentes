import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from './useSocketIo'

const Chat = ({idUser}) =>{
    const {messages, sendMessage} = useSocket(idUser);
    const [listMessages, setListMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const {preRoomUsers} = useSelector(state => state)

    useEffect(() =>{
        messages.text &&
    setListMessages([...listMessages, messages])
    }, [messages])

    function handleMessage(e){
        setNewMessage(e.target.value)
    }

    function handleSendMessage(e){
        sendMessage(newMessage);
        setNewMessage("");
    }


    return (
        <div>
            <p>jugadores {preRoomUsers?.users?.length}/6</p>
            <div>
                <ol>
                    {
                        listMessages?.map((message, index) => {
                            return (
                                <li key={index}>
                                    {
                                        message.writtenByCurrentUser
                                            ? `Me: ${message?.text}` 
                                            : `${message?.name}: ${message?.text}`
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
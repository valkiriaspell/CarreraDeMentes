import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSocket from './useSocketIo'
import styles from "../STYLES/preGameRoom.module.css"

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
            <p>Jugadores {preRoomUsers?.users?.length}/6</p>
            <div className={styles.containerChat}>
                <div style={{heigth:50 + "px"}} disabled={true} > 
                    {
                        listMessages?.map((message) => {
                            return (
                                        message.writtenByCurrentUser
                                            ? <p key={`${message.name}${message?.text}`} 
                                                style={{textAlign: "justify"}} 
                                                >
                                                    {`Yo: ${message?.text}`}
                                                </p>
                                            : <p key={`${message.name}${message?.text}`} 
                                                style={{textAlign: "justify", wordBreak: "break-word"}} 
                                                >
                                                    {`${message?.name}: ${message?.text}`}
                                                </p> 
                            )
                        })
                    }
                </div>
                
            </div>
                <div className={styles.containerSendMessages}>
                    <input type="text" placeholder="Escribe un mensaje..." value={newMessage} onChange={handleMessage}/>
                    <button onClick={e => handleSendMessage(e)} >Enviar</button>
                </div>
        </div>
    )
}

export default Chat;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSocket from './useSocketIo'
import styles from "../STYLES/preGameRoom.module.css"

const Chat = ({idUser, messages, sendMessage}) =>{
    /* const {messages, sendMessage} = useSocket(idUser); */
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
        e.preventDefault();
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
                                            ? <p key={`${Math.random()}${message.name}${message?.text}`} 
                                                style={{textAlign: "justify", marginBottom: "0.4rem", fontSize: "1.1rem", color: "rgba(239, 158, 36, 0.925)", fontWeight: "bold"}} 
                                                >
                                                    {`Yo: ${message?.text}`}
                                                </p>
                                            : <p key={`${Math.random()}${message.name}${message?.text}`} 
                                                style={{textAlign: "justify", wordBreak: "break-word", marginBottom: "0.4rem", fontSize: "1.1rem", color: "rgb(236, 221, 48)",  fontWeight: "bold"}} 
                                                >
                                                    {`${message?.name}: ${message?.text}`}
                                                </p> 
                            )
                        })
                    }
                </div>
            </div>
                <div className={styles.containerSendMessages}>
                    <form onSubmit={e => handleSendMessage(e)}>

                    <input 
                        type="text" 
                        placeholder="Escribe un mensaje..." 
                        value={newMessage} 
                        onChange={handleMessage} 
                        />
                    <button className="buttonSides lowgreen" onClick={e => handleSendMessage(e)} >Enviar</button>
                        </form>
                </div>
        </div>
    )
}

export default Chat;
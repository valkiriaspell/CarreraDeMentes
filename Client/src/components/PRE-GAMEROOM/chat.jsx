import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from './useSocketIo'
import styles from "../STYLES/preGameRoom.module.css"
import { loginUser } from "../../redux/actions";

const Chat = ({idUser}) =>{
    const {messages, sendMessage} = useSocket(idUser);
    const [listMessages, setListMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const {preRoomUsers} = useSelector(state => state)
const dispatch = useDispatch()
const {user} = useSelector(state => state)
    useEffect(() =>{
        messages.text &&
    setListMessages([...listMessages, messages])
    }, [messages])

    function handleMessage(e){
        setNewMessage(e.target.value)
    }
    const email = localStorage.getItem("email");
    function handleSendMessage(e){
        !user.name 
            ?  dispatch(loginUser(email))
            .then(() => sendMessage(newMessage))
            : sendMessage(newMessage);
        setNewMessage("");
    }


    return (
        <div>
            <p>Jugadores {preRoomUsers?.users?.length}/6</p>
            <div className={styles.containerChat}>
                <ol>
                    {
                        listMessages?.map((message, index) => {
                            return (
                                <li key={index}>
                                    {
                                        message.writtenByCurrentUser
                                            ? `Yo: ${message?.text}` 
                                            : `${message?.name}: ${message?.text}`
                                    }
                                </li>
                            )
                        })
                    }

                </ol>
            </div>
                <div className={styles.containerSendMessages}>
                    <input type="text" placeholder="Escribe un mensaje..." value={newMessage} onChange={handleMessage}/>
                    <button onClick={e => handleSendMessage(e)} >Enviar</button>
                </div>
        </div>
    )
}

export default Chat;
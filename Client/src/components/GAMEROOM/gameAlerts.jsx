import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useSocket from "../PRE-GAMEROOM/useSocketIo";


function ChatGameRoom(){
    
    const [listSuccess, setListSuccess] = useState([])
    const {preRoomUsers} = useSelector(state=> state)
    const {points} = useSocket(preRoomUsers?.id)
    /* const [newSuccess, setNewSuccess] = useState("") */ // mati ya tiene un estado donde pone los nuevos puntos

    useEffect(() =>{
        console.log(points)
        points.name &&
        setListSuccess([...listSuccess, points])
    }, [points])


    return (
        <div className="containerChatGame">
                <div style={{heigth:50 + "px"}} disabled={true} > 
                    {
                        listSuccess?.map((success) => {
                            return (
                                <p key={`${Math.random()}${success.name}}`} 
                                        style={{textAlign: "justify", wordBreak: "break-word"}} 
                                >
                                    {`${success?.name}: ${success?.point}`}
                                </p> 
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default ChatGameRoom;
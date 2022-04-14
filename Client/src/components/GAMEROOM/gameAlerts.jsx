import React, { useState, useEffect } from "react";



function ChatGameRoom({points}){
    
    const [listSuccess, setListSuccess] = useState([])

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
                                    {`${success?.name} acierta + ${success?.point} pts!`}
                                </p> 
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default ChatGameRoom;

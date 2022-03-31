import React from "react";
import { useSelector } from "react-redux";

import s from '../STYLES/preGameRoom.module.css'

const ListPlayers = ({expelPlayer}) =>{
    const {preRoomUsers, user} = useSelector(state => state)

    function handleExpectPlayer(e){
        //validate that player is not ready before to expel him out of the room
        const userToExpel = preRoomUsers.findIndex(user=> user.email === e.target.id)
        preRoomUsers[userToExpel].ready !== true && expelPlayer(e);
    }

    return (
        <ul>
        {
            user.host === true 
            ?
            preRoomUsers?.map(user =>{
                return (
                    <>
                        <button key={user.email} className={s.inactive} id={user.email} >listo</button>
                        <li key={user.email}>{user.name}</li>
                        <button 
                            onClick={handleExpectPlayer} 
                            id={user.email}
                            key={user.email} 
                            disabled={user.host ? true : false} 
                        >
                            x
                        </button>
                        {
                            user.host === true && <div>H</div>
                        }
                    </>
                )
            })
            :
            preRoomUsers?.map(user =>{
                return (
                    <>
                        <button key={user.email} className={s.inactive} id={user.email} >listo</button>
                        <li key={user.email}>{user.name}</li>
                        {
                            user.host === true && <div>H</div>
                        }
                    </>
                )
            })
        }
        <li>personajes 1</li>
        <li>personajes 2</li>
        <li>personajes 3</li>
        <li>personajes 4</li>
        <li>personajes 5</li>
        <li>personajes 6</li>
    </ul>
    )
}

export default ListPlayers;
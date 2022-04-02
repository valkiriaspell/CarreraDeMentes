import React from "react";
import { useSelector } from "react-redux";
import s from '../STYLES/preGameRoom.module.css'

const ListPlayers = ({expelPlayer}) =>{
    const {preRoomUsers, user} = useSelector(state => state)

    function handleExpectPlayer(e){
        //validate that player is not ready before to expel him out of the room
        const userToExpel = preRoomUsers?.users.findIndex(user=> user.id === e.target.id)
        preRoomUsers?.users[userToExpel].ready !== true && expelPlayer(e);
    }
    return (
        <div className={s.containerPlayers}>
        <ul>
        {
            user.host === true 
            ?
            preRoomUsers?.users?.map(us =>{
                console.log(us)
                return (
                    <div key={us.id}>
                        <div key={us.id} className={s.inactive} id={us.id} >listo</div>
                        <li key={`${user.id}2`}>{us.id}</li>
                        <button 
                            onClick={handleExpectPlayer} 
                            id={user.email}
                            key={`${user.id}3`} 
                            disabled={user.host ? true : false} 
                        >
                            x
                        </button>
                        {
                            user.host === true && <div key={`${user.id}4`} >H</div>
                        }
                    </div>
                )
            })
            : 
            preRoomUsers?.users?.map(user =>{
                return (
                    <div key={`${user.id}6`}>
                        <button key={`${user.id}6`} className={s.inactive} id={user.email} >listo</button>
                        <li key={`${user.id}7`}>{user.name}</li>
                        {
                            user.host === true && <div key={`${user.id}8`} >H</div>
                        }
                    </div>
                )
            })
        }
{/*         <li>personajes 1</li>
        <li>personajes 2</li>
        <li>personajes 3</li>
        <li>personajes 4</li>
        <li>personajes 5</li>
        <li>personajes 6</li> */}
    </ul>
        </div>
    )
}

export default ListPlayers;
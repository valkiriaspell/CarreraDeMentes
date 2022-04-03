import React from "react";
import { useSelector } from "react-redux";
import s from '../STYLES/preGameRoom.module.css'

const ListPlayers = ({ expelPlayer }) => {
    const { preRoomUsers, user } = useSelector(state => state)

    function handleExpectPlayer(e) {
        //validate that player is not ready before to expel him out of the room
        const userToExpel = preRoomUsers?.users.findIndex(user => user.id === e.target.id)
        preRoomUsers?.users[userToExpel].ready !== true && expelPlayer(e);
    }
    return (
        <div className={s.containerPlayers}>
            <ul className="allPlayers">
                {
                    user?.host === true
                        ?
                        preRoomUsers?.users?.map(us => {
                            console.log(us)
                            return (
                                <div className="eachPlayer" key={us.id}>
                                    <li key={`${us.id}2`}>{us.name}</li>
                                    {user.id === us.id
                                        ? <div key={`${user.id}4`} >Host</div>
                                        :
                                        <button
                                        onClick={handleExpectPlayer}
                                        key={`${us.id}3`}
                                        >
                                            x 
                                        </button>
                                    }
                            <div key={us.id} className={s.inactive} id={us.id} >listo</div>
                                </div>
                            )
                        })
                        :
                        preRoomUsers?.users?.map(us => {
                            return (
                                <div key={`${us.id}6`}>
                                    <button key={`${us.id}6`} className={s.inactive} id={us.id} >listo</button>
                                    <li key={`${us.id}7`}>{us.name}</li>
                                    {
                                        us.host === true && <div key={`${us.id}8`} >H</div>
                                    }
                                </div>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default ListPlayers;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from '../STYLES/preGameRoom.module.css'
import corona from "../IMG/corona.png"
import readyDark from "../IMG/readyDark.png"
import readyGreen from "../IMG/readyGreen.png"

const ListPlayers = ({ expelPlayer }) => {
    const { preRoomUsers, user } = useSelector(state => state)
    const [readyPlayer, setReady] = useState(readyDark)

    function handleExpectPlayer(e) {
        //validate that player is not ready before to expel him out of the room
        const userToExpel = preRoomUsers?.users.findIndex(user => user.id === e.target.id)
        preRoomUsers?.users[userToExpel].ready !== true && expelPlayer(e);
    }

       
    function ready () {
        if (readyPlayer === readyDark) {
            setReady(readyGreen)
        } else {
            setReady(readyDark)
        }
    }

    useEffect(() =>{
        console.log("ready")
      }, [readyPlayer])

    return (
        <div className={s.containerPlayers}>
            <ul className={s.allPlayers}>
                {user?.host === true ?
                    preRoomUsers?.users?.map(us => {
                        console.log(us)
                        return (
                            <div key={us.id}>

                                <li key={`${user.id}2`}>{user.host === true &&
                                    <div className={s.coronaHost} key={`${user.id}4`} >
                                        <img src={corona} alt="corona">
                                        </img>
                                    </div>}{user.name}
                                <div key={us.id} id={us.id} ><button className="readyButton" key={us.id} onClick={()=> ready()}>
                                    <img src={readyPlayer} alt="ready"></img></button></div>
                                </li>
                                {us.id !== user.id && <button
                                    onClick={handleExpectPlayer}
                                    id={user.email}
                                    key={`${user.id}3`}
                                >x </button>
                                }
                            </div>
                        )
                    })
                    :
                    preRoomUsers?.users?.map(user => {
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
            </ul>
        </div>
    )
}

export default ListPlayers;
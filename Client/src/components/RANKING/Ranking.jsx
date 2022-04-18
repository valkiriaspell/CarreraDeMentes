import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allUsersLevel } from "../../redux/actions";
import Style from "../STYLES/Ranking.module.css"
import Ranking_Tabla from "./Ranking_Tabla";
import Music from './components/MUSICA/musica';

export default function Ranking(){

    const users = useSelector(state => state.totalUsers);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(allUsersLevel());
    }, []);

    

    return(<div>
        <div className= {Style.btn_home}>

            <NavLink style={{margin:"0.5rem"}} to={'/home'}>
			    <button  className="buttonSides brown">Volver</button>
		    </NavLink>
        </div>
        <h1 className= {Style.title}>Ranking de Jugadores</h1>
            <div className= {Style.data}>
                <div className = {Style.data_title}>
                    <Ranking_Tabla ranking={"POSICION"} wins={"PUNTOS"} name={"NAME"} level={"NIVEL"} points={"EXP."} avatar={"https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo5.png?alt=media&token=5e5bb88d-806a-4c38-b667-b27a9b5b01fc"} />

                </div>
                {users.map(({id, name, level, wins, experiencePoints, avatars}, i)=>{
                    const {imageUrl} = avatars[0];
                    return <Ranking_Tabla ranking={(i + 1 )} key={id} wins={wins} name={name} level={level} points={experiencePoints} avatar={imageUrl} />
                })}
            </div>

    </div>)
}
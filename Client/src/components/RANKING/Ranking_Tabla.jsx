import React from "react";
import Style from "../STYLES/Ranking.module.css"

export default function Ranking_Tabla({ranking, name, level, wins, points, avatar}){

    const rank = ()=>{
        switch(ranking){
            case 1:
                return <span className={Style.corona} ><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king.png" /></span>;
            case 2:
                return <span className={Style.corona}><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king2.png" /></span>;
            case 3:
                return <span className={Style.corona}><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king3.png" /></span>;
            default:
                return <span>{ranking}</span>;
        }
    }

    return(<div className={Style.view_data}>

        { rank() }
        <span>{wins}</span>
        <span>{name}</span>
        <span>{level}</span>
        <span>{points}</span>
        <span><img src={avatar} /></span>
        
    </div>)
}
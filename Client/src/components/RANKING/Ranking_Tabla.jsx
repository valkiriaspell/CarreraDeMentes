import React from "react";
import Style from "../STYLES/Ranking.module.css"

export default function Ranking_Tabla({ranking, name, level, wins, points, avatar}){

    const rank = ()=>{
        switch(ranking){
            case 1:
                return <span className={Style.coronaRanking} ><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king.png" alt="corona" /></span>;
            case 2:
                return <span className={Style.coronaRanking}><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king2.png" alt="corona2" /></span>;
            case 3:
                return <span className={Style.coronaRanking}><img src="https://raw.githubusercontent.com/valkiriaspell/CarreraDeMentes/dev/Client/src/components/IMG/king3.png" alt="corona3" /></span>;
            default:
                return <span>{ranking}</span>;
        }
    }

    return(<div className={Style.view_dataRanking}>

        { rank() }
        <span className={Style.infoUserRanking}>{wins}</span>
        <span className={Style.infoUserRanking}>{name}</span>
        <span className={Style.infoUserRanking}>{level}</span>
        <span className={Style.infoUserRanking}>{points}</span>
        <span className={Style.infoUserRanking}><img src={avatar} alt="avatar"/></span>
        
    </div>)
}
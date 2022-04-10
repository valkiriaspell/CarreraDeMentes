import React, { useState } from "react";
import "../STYLES/endGame.css";


export default function EndGame() {

    return (
        <div className="containerEG">
            <div className="scoreTable">
                <div className="interior">
                    <div className="resultados">                 
                            <li>Puesto</li>
                            <li>Jugador</li>
                            <li>Puntos ganados</li>
                            <li>Nivel</li>                           
                    </div>
                    <div className="resultados">                 
                            <li>1°</li>
                            <li>Player 1</li>
                            <li>120</li>
                            <li>5</li>                           
                    </div>
                    <div className="resultados">                 
                            <li>1°</li>
                            <li>Player 1</li>
                            <li>120</li>
                            <li>5</li>                           
                    </div>
                    </div>               
                    
                
            </div>

        </div>
    )
}
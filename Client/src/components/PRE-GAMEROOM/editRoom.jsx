import React, { useState } from "react";
import s from '../STYLES/preGameRoom.module.css'

const EditRoom = () =>{
    const [settingGame, setSettingGame] = useState({
        category: "",
        difficulty: "easy",
        rounds: "ten",
        open: true
    })

    function handleChange(e){
        setSettingGame({
            ...settingGame,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        
    }

    return (
        <div className={s.containerEditRoom}>
            <form className={s.formEditRoom} onSubmit={e => handleSubmit(e)}>
                <div>
                    <h5 style={{fontWeight: "bold"}}>Ajustes de la Partida</h5>
                </div>
                <div className={s.contentEditRoom}>
                    <label >Tiempo</label>
                    <select name="difficulty"  onChange={e => handleChange(e)}>
                        <option value="easy">15</option>
                        <option value="medium">20</option>
                        <option value="dificult">25</option>
                    </select>
                </div>
                <div className={s.contentEditRoom}>
                    <label >Categoría excluída</label>
                    <select name="category"  onChange={e => handleChange(e)}>
                        <option value="">Ninguna</option>
                        <option value="sports">Deportes</option>
                        <option value="music">Música</option>
                        <option value="history">Historia</option>
                        <option value="science">Ciencia</option>
                        <option value="art">Arte</option>
                        <option value="movies">Cine</option>
                        <option value="geography">Geografía</option>
                    </select>
                </div>
                <div className={s.contentEditRoom}>
                    <label >Cantidad de preguntas</label>
                    <select name="rounds"  onChange={e => handleChange(e)}>
                        <option value="ten" >10</option>
                        <option value="fifteen" >15</option>
                        <option value="twenty" >20</option>
                    </select>
                </div>
                <div className={s.contentEditRoom}>
                    <label >Estado de la sala</label>
                    <select name="open"  onChange={e => handleChange(e)}>
                        <option value={true} >Pública</option>
                        <option value={false} >Privada</option>
                    </select>
                </div>
                <div className={s.buttonSubmitChanges}>
                    <button type="submit" >Establecer cambios</button>
                </div>
            </form>
        </div>
    )
}

export default EditRoom;
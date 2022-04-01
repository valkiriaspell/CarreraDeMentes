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
        <form onSubmit={e => handleSubmit(e)}>
            <div>
            <label >Tiempo</label>
            <select name="difficulty"  onChange={e => handleChange(e)}>
                <option value="easy">15</option>
                <option value="medium">20</option>
                <option value="dificult">25</option>
            </select>
            </div>
            <label >Categoria excluida</label>
            <select name="category"  onChange={e => handleChange(e)}>
                <option value="">Ninguna</option>
                <option value="sports">Deportes</option>
                <option value="music">Musica</option>
                <option value="history">Historia</option>
                <option value="science">Ciencia</option>
                <option value="art">Arte</option>
                <option value="movies">Cine</option>
                <option value="geography">Geografia</option>
            </select>
            <label >Cantidad de rondas</label>
            <select name="rounds"  onChange={e => handleChange(e)}>
                <option value="ten" >10</option>
                <option value="fifteen" >15</option>
                <option value="twenty" >20</option>
            </select>
            <label >Publica o Privada</label>
            <select name="open"  onChange={e => handleChange(e)}>
                <option value={true} >publica</option>
                <option value={false} >privada</option>
            </select>
            <button type="submit" >establecer cambios</button>
        </form>
        </div>
    )
}

export default EditRoom;
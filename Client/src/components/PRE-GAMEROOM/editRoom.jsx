import React, { useState } from "react";

const EditRoom = () =>{
    const [settingGame, setSettingGame] = useState({
        category: "",
        difficulty: "easy",
        rounds: "two",
        public: true
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
        <form onSubmit={e => handleSubmit(e)}>
            <label >Tiempo</label>
            <select name="difficulty"  onChange={e => handleChange(e)}>
                <option value="easy">15</option>
                <option value="medium">20</option>
                <option value="dificult">25</option>
            </select>
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
                <option value="two" >2</option>
                <option value="three" >3</option>
                <option value="four" >4</option>
            </select>
            <label >Publica o Privada</label>
            <select name="public"  onChange={e => handleChange(e)}>
                <option value={true} >publica</option>
                <option value={false} >privada</option>
            </select>
            <button type="submit" >establecer cambios</button>
        </form>
    )
}

export default EditRoom;
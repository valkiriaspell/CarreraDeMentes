import React from "react";
import { useSelector } from "react-redux";
import s from '../STYLES/preGameRoom.module.css'
import useSocket from "./useSocketIo";

const EditRoom = ({idUser}) =>{
    const {user} = useSelector(state => state)
    const { handleSubmitConfig, roomConfiguration, setRoomConfiguration } = useSocket(idUser)

    function handleChange(e){
        setRoomConfiguration({
            ...roomConfiguration,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className={s.containerEditRoom}>
            <form className={s.formEditRoom} onSubmit={e => handleSubmitConfig(e, roomConfiguration)}>
                <div>
                    <h5 style={{fontWeight: "bold"}}>Ajustes de la Partida</h5>
                </div>
                <div className={s.contentEditRoom}>
                    <label >Tiempo</label>
                    {
                        user.host === true
                            ?
                            <select name="time"  onChange={e => handleChange(e)}>
                                <option value={25}>25</option>
                                <option value={20}>20</option>
                                <option value={15}>15</option>
                            </select>
                            : <div>{roomConfiguration.time}</div>
                    }
                </div>
                <div className={s.contentEditRoom}>
                    <label >Categoría excluída</label>
                    {
                        user.host === true
                            ?
                            <select name="category"  onChange={e => handleChange(e)}>
                                <option value="">Ninguna</option>
                                <option value="Deporte">Deporte</option>
                                <option value="Musica">Musica</option>
                                <option value="Historia">Historia</option>
                                <option value="Ciencias">Ciencias</option>
                                <option value="Arte">Arte</option>
                                <option value="Cine">Cine</option>
                                <option value="Geografia">Geografia</option>
                            </select>
                            : <div>{roomConfiguration.category}</div>
                    }
                </div>
                <div className={s.contentEditRoom}>
                    <label >Cantidad de preguntas</label>
                    {
                        user.host === true
                            ?
                            <select name="questions"  onChange={e => handleChange(e)}>
                                <option value={10} >10</option>
                                <option value={15} >15</option>
                                <option value={20} >20</option>
                            </select>
                            : <div>{roomConfiguration.questions}</div>
                    }
                </div>
                <div className={s.contentEditRoom}>
                    <label >Estado de la sala</label>
                    {
                        user.host === true
                            ?
                            <select name="open"  onChange={e => handleChange(e)}>
                                <option value={true} >Pública</option>
                                <option value={false} >Privada</option>
                            </select>
                            : roomConfiguration?.open === true
                                ? <div>Pública</div>
                                : <div>Privada</div>
                    }
                </div>
                {
                    user.host === true &&
                        <div className={s.buttonSubmitChanges}>
                            <button type="submit" >Establecer cambios</button>
                        </div>
                }
            </form>
        </div>
    )
}

export default EditRoom;
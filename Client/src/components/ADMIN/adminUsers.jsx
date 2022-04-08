import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import "../STYLES/admin.css"
import Swal from "sweetalert2";
import { GrRefresh, GrUpdate } from "react-icons/gr";
import { allUsers } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function AdminUsers() {
    
    const dispatch = useDispatch();
    const [selectedUsers, setUsers] = useState([])

    useEffect(() => {
    dispatch(allUsers())
    }, [])

    const { totalUsers } = useSelector(state => state)
    

    function refresh() {
        document.location.reload(true)
    }

    function darkTheme(e) {
        e.preventDefault()
        let [tablaPreguntas] = document.getElementsByClassName("adminQuestions")
        if (tablaPreguntas.classList.contains('dark')) {
            console.log(tablaPreguntas.classList)
            tablaPreguntas.style.background = 'rgb(38, 2, 31)'
            tablaPreguntas.classList.remove('dark')
            tablaPreguntas.style.color = 'white'
        } else {
            tablaPreguntas.classList.add('dark')
            tablaPreguntas.style.background = 'white'
            tablaPreguntas.style.color = 'rgb(38, 2, 31)'
        }
    }

    function handleChecks(e) {
        if (!selectedUsers.includes(e.target.value)) {
            setUsers([...selectedUsers, e.target.value])
        } else {
            let newUsers = selectedUsers.filter(p => p !== e.target.value)
            setUsers(newUsers)
        }
    }

    function bannUser () {

    }

    function createAdmin () {

    }

    return (
        <div className='containerAdmin'>
            <div className='barraSobreQuestions'>
                <h6>Usuarios seleccionados: {selectedUsers.length}</h6>
                <button className='botonesBarra' onClick={() => createAdmin()}>Crear Admin</button>
                <button className='botonesBarra' onClick={() => bannUser()}>Sancionar</button>
                <button className='botonesBarra' onClick={(e) => refresh(e)}><GrUpdate color="white"/></button>
                <button className='botonesBarra' onClick={(e) => darkTheme(e)}><CgDarkMode /></button>
            </div>
            <div className='adminQuestions'>
                <table className='questionTable'>
                    <tbody>
                        <tr className='titulos'>
                            <th>Seleccionar</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Nivel</th>
                            <th>Monedas</th>                           
                        </tr>
                        {totalUsers?.map(q =>
                            <tr key={q.id}>
                                <th><input type="checkbox" id="check" value={q.id} onClick={(e) => handleChecks(e)} /></th>                                
                                <th>{q.email}</th>
                                <th>{q.name}</th>
                                <th>{q.level}</th>                            
                                <th>{q.coins}</th>                                                            
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

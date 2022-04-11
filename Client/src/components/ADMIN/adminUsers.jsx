import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import "../STYLES/admin.css"
import Swal from "sweetalert2";
import { GrRefresh, GrUpdate } from "react-icons/gr";
import { allUsers, bannUser, createAdmin } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RiGradienterLine } from "react-icons/ri";




export default function AdminUsers() {

    const dispatch = useDispatch();
    const [selectedUser, setUser] = useState("")
    const [action, setAction] = useState("crear")
    const [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(allUsers())
    }, [])

    let { totalUsers } = useSelector(state => state)


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

    function handleCheck(e) {
        setUser(e.target.value)
        console.log(e.target.value)
    }

    function banearUser() {
        Swal.fire({
            title: `Este usuario no podrá acceder a su cuenta por 72 hs.¿Desea continuar?`,
            icon: "warning",
            showDenyButton: true,
            backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
            confirmButtonText: "Si",
            denyButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `El usuario cuyo mail es ${selectedUser} ha sido sancionado`,
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(bannUser(selectedUser));
                        document.location.reload(true)
                    }
                })
            }
        })
    }
    function actions(e) {
        setAction(e.target.value)
    }
    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleAdmin(e) {
        if (action === "crear") {
            Swal.fire({
                title: `Este usuario tendrá acceso como 'Administrador'`,
                icon: "warning",
                showDenyButton: true,
                backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
                `,
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(createAdmin({ email: selectedUser, admin: "admin" }));
                    Swal.fire({
                        title: `El usuario cuyo mail es ${selectedUser} es ahora Administrador`,
                        confirmButtonText: "Ok"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            document.location.reload(true)
                        }

                    })
                }
            })
        } else {
            Swal.fire({
                title: `Este usuario dejará de ser 'Administrador'`,
                icon: "warning",
                showDenyButton: true,
                backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
                `,
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(createAdmin({ email: selectedUser, admin: "normal" }))
                    Swal.fire({
                        title: `El usuario cuyo mail es ${selectedUser} ya no es Administrador`,
                        confirmButtonText: "Ok"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            document.location.reload(true)
                        }
                    })
                }
            })
        }
    }

    if (search && search !== "") {
        totalUsers = totalUsers.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    }
    ////---> Que no aparezca el superadmin ni guests en la lista <---////
    totalUsers = totalUsers.filter(d => d.admin !== "superadmin")
    totalUsers = totalUsers.filter(d => d.guest !== true)


    return (
        <div className='containerAdmin'>
            <div className='barraSobreQuestions'>
                <div className='handleAdmin'>
                    <select className='botonesBarra' onChange={(e) => actions(e)}>
                        <option key={1} value="crear">Crear Admin </option>
                        <option key={2} value="deshacer">Deshacer Admin </option>
                    </select>
                    <button className='botonesBarra' value="go" onClick={(e) => handleAdmin(e)}><RiGradienterLine /></button>
                </div>
                <button className='botonesBarra' onClick={() => banearUser()}>Sancionar</button>

                <input
                    className="BuscadorUsers"
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={handleSearch}
                />
                <button className='botonesBarra' onClick={(e) => refresh(e)}><GrUpdate color="white" /></button>
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
                            <th>Categoria</th>
                        </tr>
                        {totalUsers?.map(q =>
                            <tr key={q.email}>
                                <th><input type="radio" id={q.email} name="radiob" value={q.email} onClick={(e) => handleCheck(e)} /></th>
                                <th>{q.email}</th>
                                <th>{q.name}</th>
                                <th>{q.level}</th>
                                <th>{q.coins}</th>
                                <th>{q.admin}</th>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

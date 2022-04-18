import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import "../STYLES/admin.css"
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import { allUsers, bannUser, createAdmin, sendingMail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RiGradienterLine } from "react-icons/ri";
import  AdminNav  from './adminNav'
import admin03 from '../IMG/Admin3.png'


export default function AdminUsers() {

    const dispatch = useDispatch();
    const [selectedUser, setUser] = useState("")
    const [action, setAction] = useState("crear")
    const [search, setSearch] = useState("")
    const textAdmin = "Te informamos que has sido designado como Administrador de ZooPer Trivia. Ahora podrás acceder a la sección de administrador donde podrás verificar el ingreso de nuevas preguntas al juego!"
    const textNoAdmin = "Te informamos que tu cuenta ya no tendrá acceso al área de Administrador"
    const textBann = "Te informamos que debido a algún incumplimiento a las normas de ZooPer Trivia. Tu cuenta ha sido banneada. No podrás acceder durante 72hs. Te sugerimos no reincidir en este comportamiento para evitar un posible banneo permanente."

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
                        dispatch(sendingMail({
                            userMail: selectedUser,
                            textMail: textBann
                        }))
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
                    dispatch(sendingMail({
                        userMail: selectedUser,
                        textMail: textAdmin
                    }))
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
                    dispatch(sendingMail({
                        userMail: selectedUser,
                        textMail: textNoAdmin
                    }))
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
            <div className='adminHome'>
                <div className='questionsNav'>
                <img 
                    width="220px" 
                    src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" 
                    alt='Logo'>
                </img>
                <h2>Bienvenido/a a la sección para Configurar Usuarios</h2>
                <img width="100px" src={admin03} alt='Admin03'></img>
                < AdminNav />
        </div>
        <hr/>

            <div className='navHomeAdmin'>
                    <input
                        className="BuscadorUsers"
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={handleSearch}
                        />
                <div className='botonesBarra'>
                        <select onChange={(e) => actions(e)}>
                            <option>Configuración Admin</option>
                            <option disabled={!selectedUser} key={1} value="crear">Crear Admin</option>
                            <option disabled={!selectedUser} key={2} value="deshacer">Deshacer Admin</option>
                        </select>
                        <button disabled={!selectedUser} className='botonesBarra' value="go" onClick={(e) => handleAdmin(e)}><RiGradienterLine /></button>
                </div>
                <h6 className='botonesBarra'>Usuarios: {totalUsers.length}</h6>
                <button disabled={!selectedUser}  className='botonesBarra' onClick={() => banearUser()}>Habilitar/Deshabilitar Sanción</button>
                <button className='botonesBarra' onClick={(e) => refresh(e)}><GrUpdate color="white" /></button>
                {/* <button className='botonesBarra' onClick={(e) => darkTheme(e)}><CgDarkMode /></button> */}
            </div>
            <hr/>

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
                            <th>Estado</th>
                            <th>Fecha Sanción</th>
                        </tr>
                        {totalUsers?.map(q =>
                            <tr key={q.email}>
                                <td><input type="radio" id={q.email} name="radiob" value={q.email} onClick={(e) => handleCheck(e)} /></td>
                                <td>{q.email}</td>
                                <td>{q.name}</td>
                                <td>{q.level}</td>
                                <td>{q.coins}</td>
                                <td>{q.admin}</td>
                                {q.banner?<td>Sancionado</td>:<td>Habilitado</td>}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

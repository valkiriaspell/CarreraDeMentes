import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { getNewQuestions, handleQuestion } from '../../redux/actions';
import "../STYLES/admin.css"
import Swal from "sweetalert2";
import { GrRefresh, GrUpdate } from "react-icons/gr";
import { useHistory } from 'react-router-dom';
import {deleteStorage} from "../../utils/Firebase.js"


export default function AdminQuestions() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [preguntasID, setPreguntas] = useState([])
    const [category, setCategory] = useState("")


    useEffect(() => {
        dispatch(getNewQuestions())
    }, [])
    
    let { newQuestions } = useSelector(state => state)
    console.log("nuevasP", newQuestions)

    ///////////---->>> Functions  <<<----///////////
    function darkTheme(e) {
        e.preventDefault()
        let [tablaPreguntas] = document.getElementsByClassName("questionTable")
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
        if (!preguntasID.includes(e.target.value)) {
            setPreguntas([...preguntasID, e.target.value])
        } else {
            let newPreguntas = preguntasID.filter(p => p !== e.target.value)
            setPreguntas(newPreguntas)
        }
    }

    function acceptQuestions() {
        console.log(preguntasID, "preguntas ids")
        Swal.fire({
            title: `Estas preguntas serán agregadas a la base de datos de ZooPer Trivia`,
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
                const accept = "accept"
                preguntasID.forEach(p => dispatch(handleQuestion(p, accept)))
                Swal.fire({
                    title: 'Preguntas enviadas',
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.location.reload(true)
                    }

                })
            }
        })
    }

    function rejectQuestions() {
        console.log(preguntasID, "preguntas ids")
        Swal.fire({
            title: `Estas preguntas serán eliminadas de forma permanente`,
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
                const reject = "reject"
                preguntasID.forEach(p => {
                    deleteStorage(p.image)
                    dispatch(handleQuestion(p, reject))
                })
                Swal.fire({
                    title: 'Preguntas eliminadas',
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.location.reload(true)
                    }

                })
            }
        })
    }
    function refresh() {
        document.location.reload(true)
    }

    function handleCategory(e) {
        setCategory(e.target.value)
    }

    if (category && category !== "") {
        newQuestions = newQuestions.filter(d => d.category.toLowerCase().includes(category.toLowerCase()))
    }

    newQuestions = newQuestions.sort( (a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }        
        return 0;
      });

    return (
        <div className='containerAdmin'>
            <div className='barraSobreQuestions'>
                <h6>Preguntas seleccionadas: {preguntasID.length}</h6>
                <button className='botonesBarra' onClick={() => acceptQuestions()}>Aceptar</button>
                <button className='botonesBarra' onClick={() => rejectQuestions()}>Rechazar</button>
                <div><label>Filtrar por</label><select className="BuscadorUsers" onChange={(e) => handleCategory(e)} placeholder="Categoria" name="" id="">
              <option value="">Categoria</option>
              <option value="Historia">Historia</option>
              <option value="Geografia">Geografía</option>
              <option value="Arte">Arte</option>
              <option value="Ciencias">Ciencias</option>
              <option value="Cine">Cine</option>
              <option value="Deporte">Deporte</option>
              <option value="Musica">Musica</option>
            </select></div>
                <button className='botonesBarra' id="refresh" onClick={(e) => refresh(e)}><GrUpdate /></button>
                <button className='botonesBarra' onClick={(e) => darkTheme(e)}><CgDarkMode /></button>
            </div>
            <div className='adminQuestions'>
                <table className='questionTable'>
                    <tbody>
                        <tr className='titulos'>
                            <th>Seleccionar</th>
                            <th>ID</th>
                            <th>Autor</th>
                            <th>Categoría</th>
                            <th>Pregunta</th>
                            <th>Respuesta Correcta</th>
                            <th>Res. Falsa 1</th>
                            <th>Res. Falsa 2</th>
                            <th>Res. Falsa 3</th>
                            <th>Imagen</th>
                        </tr>
                        {newQuestions?.map(q =>
                            <tr key={q.id}>
                                <th><input type="checkbox" id="check" value={q.id} onClick={(e) => handleChecks(e)} /></th>
                                <th>{q.id}</th>
                                <th>{q.email}</th>
                                <th>{q.category}</th>
                                <th>{q.question}</th>
                                <th>{q.answer}</th>
                                <th>{q.false1}</th>
                                <th>{q.false2}</th>
                                <th>{q.false3}</th>
                                <th><a href={q.image} target="_blank">Ver Imagen</a></th>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { getNewQuestions } from '../../redux/actions';



export default function AdminQuestions() {

    const dispatch = useDispatch();
    const [preguntasID, setPreguntas] = useState([])

    
    useEffect(() =>{
        dispatch(getNewQuestions())        
        console.log("nuevasP", newQuestions)
    }, [])
    
    const {newQuestions} = useSelector(state => state)

    function darkTheme(e) {
        e.preventDefault()
        let [tablaPreguntas] = document.getElementsByClassName("adminQuestions")
        let background = "background-color"             
        if(tablaPreguntas.classList.contains('dark')){
            tablaPreguntas.style.background='rgb(38, 2, 31)'
            tablaPreguntas.classList.remove('dark')
            tablaPreguntas.style.color='white'
        }else{
            tablaPreguntas.classList.add('dark')
            tablaPreguntas.style.background='white'
            tablaPreguntas.style.color='rgb(38, 2, 31)'
        }  
    }

    
    

    function handleChecks (e) {
        if(!preguntasID.includes(e.target.value)) {
            setPreguntas([...preguntasID,e.target.value])
        } else {
            let newPreguntas = preguntasID.filter( p => p !== e.target.value)
            setPreguntas(newPreguntas)
        }
        
    }

    return (
        <div className='adminQuestions'>
            <div className='barraSobreQuestions'>
                    <h6>Preguntas seleccionadas: {preguntasID.length}</h6>                    
                    <button onClick={(e) => darkTheme(e)}><CgDarkMode/></button>
            </div>
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
            </tr>
            {newQuestions?.map(q => 
                <tr>
                    <th><input type="checkbox" id="check" value={q.id} onClick={(e) => handleChecks(e)} /></th>
                    <th>{q.id}</th>
                    <th>{q.email}</th>
                    <th>{q.category}</th>
                    <th>{q.question}</th>
                    <th>{q.answer}</th>
                    <th>{q.false1}</th>
                    <th>{q.false2}</th>
                    <th>{q.false3}</th>
                </tr>)}
            </tbody>
            </table>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { CgDarkMode } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../redux/actions';
import "../STYLES/admin.css"
import { GrUpdate } from "react-icons/gr";
import { useHistory } from 'react-router-dom';
import ChangeQuestion from './formChangeQuestion';
import  AdminNav  from './adminNav'
import admin02 from '../IMG/Admin2.png'


export default function CurrentQuestions() {
    const dispatch = useDispatch();
    const history = useHistory();

    ///////////---->>> Local States  <<<----///////////
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [selectedQuestion])

    let allQuestions = useSelector(state => state.questions)
    ///////////---->>> Functions  <<<----///////////
    function darkTheme(e) {
        e.preventDefault()
        let [tablaPreguntas] = document.getElementsByClassName("questionTable")
        let [tablaTitular] = document.getElementsByClassName("titulos")
        if (tablaPreguntas.classList.contains('dark')) {
            console.log(tablaPreguntas.classList)
            tablaPreguntas.style.background = 'rgb(38, 2, 31)'
            tablaTitular.style.background = 'rgb(38, 2, 31)'
            tablaPreguntas.classList.remove('dark')
            tablaPreguntas.style.color = 'white'
            tablaTitular.style.color = 'white'
        } else {
            tablaPreguntas.classList.add('dark')
            tablaPreguntas.style.background = 'white'
            tablaTitular.style.background = 'white'
            tablaPreguntas.style.color = 'rgb(38, 2, 31)'
            tablaTitular.style.color = 'rgb(38, 2, 31)'
        }
    }

    function refresh() {
        document.location.reload(true)
    }
      function handleCategory(e) {
        setCategory(e.target.value)
    }
    function handleSearch(e) {
        setSearch(e.target.value)
    }
    function handleCheck(e) {
        if (selectedQuestion){
            setShowForm(false)
            setSelectedQuestion(e.target.value)
        } else {

            setSelectedQuestion(e.target.value)
        }       
    }


    if (category && allQuestions) {
        allQuestions = allQuestions.filter(d => d.category.toLowerCase().includes(category.toLowerCase()))
    }

    if (search && allQuestions) {
        allQuestions = allQuestions.filter(d => d.question.toLowerCase().includes(search.toLowerCase())|| d.answer.toLowerCase().includes(search.toLowerCase()))
    }

    allQuestions = allQuestions.sort( (a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }        
        return 0;
      });


    function modifyQuestion() {     
            setShowForm(true)        
    }

    
       return (
                <div className='adminHomeQuestions'>
                    <div className='questionsNav'>
                        <img 
                            width="220px" 
                            src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" 
                            alt='Logo'>
                        </img>
                    <h2>Bienvenido/a a la sección para Modificar Preguntas</h2>
                    <img width="100px" src={admin02} alt='Admin03'></img>
                    < AdminNav />
                </div>
                <hr/>

            <div className='navHomeAdmin'>
                <input
                    className="BuscadorUsers"
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={handleSearch}
                />
                <div>
                    {/* <label>Filtrar por</label> */}
                    <select className="botonesBarra" onChange={(e) => handleCategory(e)} placeholder="Categoria" name="" id="">
                    <option value="">Categoria</option>
                    <option value="Historia">Historia</option>
                    <option value="Geografia">Geografía</option>
                    <option value="Arte">Arte</option>
                    <option value="Ciencias">Ciencias</option>
                    <option value="Cine">Cine</option>
                    <option value="Deporte">Deporte</option>
                    <option value="Musica">Musica</option>
                </select></div>
                <h6 className='botonesBarra'>Total Preguntas: {allQuestions.length}</h6>
                <button className='botonesBarra' onClick={() => modifyQuestion()}>Modificar</button>
                <button className='botonesBarra' id="refresh" onClick={(e) => refresh(e)}><GrUpdate /></button>
                {/* <button className='botonesBarra' onClick={(e) => darkTheme(e)}><CgDarkMode /></button> */}
            </div>
            <hr/>

            <div className='adminQuestions'>
                <div className='scroll'>
                <table className='questionTable'>
                    <tbody>
                        <tr className='titulos'>
                            <th>Seleccionar</th>
                            <th>ID</th>
                            <th>Categoría</th>
                            <th>Pregunta</th>
                            <th>Respuesta Correcta</th>
                            <th>Res. Falsa 1</th>
                            <th>Res. Falsa 2</th>
                            <th>Res. Falsa 3</th>
                            <th>Imagen</th>
                        </tr>
                        {allQuestions?.map(q =>
                            <tr key={q.id}>
                                <td><input type="radio" id="check" name="radioq" value={q.id} onClick={(e) => handleCheck(e)} /></td>
                                <td>{q.id}</td>
                                <td>{q.category}</td>
                                <td>{q.question}</td>
                                <td>{q.answer}</td>
                                <td>{q.false1}</td>
                                <td>{q.false2}</td>
                                <td>{q.false3}</td>
                                <td><a href={q.image} target="_blank">Ver Imagen</a></td>
                            </tr>)}
                        </tbody>
                </table>
            </div>
        </div>
            {showForm?
            <div className='popUp'>
                <ChangeQuestion refresh={refresh} selectedQuestion={selectedQuestion} setShowForm={setShowForm}></ChangeQuestion>
            </div>
                : null }
    </div>
    )
}
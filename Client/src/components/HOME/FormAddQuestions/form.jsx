import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newQuestion } from '../../../redux/actions';
import { Link, useHistory } from 'react-router-dom'
import DragDrop from './drag-drop';
import "../../STYLES/form.css"
import Swal from 'sweetalert2';
import {uploadFiles} from '../../../utils/Firebase.js'

export default function FormAddQuestions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const autenticado = localStorage.getItem('token')
    const email = localStorage.getItem('email')  
    const { user } = useSelector(state => state);  

    //////////  ---->    Local states data   <------ //////////////
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [answer, setAnswer] = useState("");
    const [false1, setF1] = useState("");
    const [false2, setF2] = useState("");
    const [false3, setF3] = useState("");
    const [image, setImg] = useState(null);
    const [msg, setMSG] = useState("");
    const [terminos, setTerminos] = useState(false);
    //////////  ---->    Local states errors   <------ //////////////
    const [errorQuestion, setErrorQ] = useState("")
    const [errorAnswer, setErrorA] = useState("")
    const [errorImage, setErrorImage] = useState("")
    const [errorTotal, setErrorTotal] = useState("")

    /////////  ---->    Store states    <------ //////////////

    //necesito traer las categorias de forma real porque el admin podria crear nuevas categorias eventualmente
    let falseCategories = ["Musica", "Deporte", "Cine", "Arte", "Ciencias", "Geografia", "Historia"]

    // Alerta si es GUEST
    if(user.guest){
        Swal.fire({
            icon: "error",
            title:
              "Debes tener una cuenta para crear preguntas",
            showConfirmButton: false,
            heightAuto: false,
            timer: 3000,
          });
        history.push('/home')
    }


    //////////////// ---->    VALIDATIONS    <------ /////////////

    function validation(e) {

        switch (true) {

            case e.target.name === "question":
                if (!/^\¿.*?\?$/.test(e.target.value)) {
                    setQuestion(e.target.value);
                    setErrorQ("Colocar signos ¿? correctamente")

                } else if (e.target.value.length > 60) {
                    setQuestion(e.target.value);
                    setErrorQ("Máximo 60 carácteres")
                } else {
                    setQuestion(e.target.value);
                    setErrorQ("")
                }
                break;
            case e.target.name === "answer":
                if (e.target.value.length > 40) {
                    setAnswer(e.target.value);
                    setErrorA("Máximo 40 carácteres")
                } else {
                    setAnswer(e.target.value);
                    setErrorA("")
                }
                break;
            case e.target.name === "false1":
                if (e.target.value.length > 40) {
                    setF1(e.target.value);
                    setErrorA("Máximo 40 carácteres")
                } else {
                    setF1(e.target.value);
                    setErrorA("")
                }
                break;
            case e.target.name === "false2":
                if (e.target.value.length > 40) {
                    setF2(e.target.value);
                    setErrorA("Máximo 40 carácteres")
                } else {
                    setF2(e.target.value);
                    setErrorA("")
                }
                break;
            case e.target.name === "false3":
                if (e.target.value.length > 40) {
                    setF3(e.target.value);
                    setErrorA("Máximo 40 carácteres")
                } else {
                    setF3(e.target.value);
                    setErrorA("")
                }
                break;
            case e.target.name === "image": 
            if (!/\.(jpg|png|gif)$/.test(e.target.value)) {
                    setImg(e.target.value);
                    setErrorImage("No es un URL válido")
                } else {
                    setImg(e.target.value);
                    setErrorImage("") 
                }

                break;
            default:
                console.log("default");
        }
        
        
    }

    function conditions(e) {
        e.preventDefault()
        let [terminos] = document.getElementsByClassName("terminos")
        console.log(terminos, "terminos")      
        if(terminos.classList.contains('desplegado')){
            terminos.style.height='0px'
            terminos.classList.remove('desplegado')
        }else{
            terminos.classList.add('desplegado')
            terminos.style.height='80px'
        }  
    }

    function handleTerms() {
        terminos ? setTerminos(false) : setTerminos(true)
    }
    function handleCategory(e) {
        setCategory(e.target.value)
    }

   
    //////////  ---->    on Submit   <------ //////////////
    const onSubmit = async (e) => {
        e.preventDefault()
        //////////////// ---->    NO EMPTY ANSWERS   <------ /////////////
        !question || !answer || !false1 || !false2 || !false3 || !image ? setErrorTotal("Completar formulario") : setErrorTotal("")
        
        //////////////// ---->    NO REPEATED ANSWERS   <------ /////////////
        let fourAnswers = [answer, false1, false2, false3]
        if (fourAnswers) {
            let uniqueAnswers = []
            let repetida = []
            for (let i = 0; i < fourAnswers.length; i++) {
                if (!uniqueAnswers.includes(fourAnswers[i])) {
                    uniqueAnswers.push(fourAnswers[i])
                } else {
                    repetida.push(fourAnswers[i])
                }
            }
            if (uniqueAnswers.length < 4) {
                setErrorA("No puede haber respuestas iguales")
                
            } else {
                setErrorA("")
                setMSG("Tu pregunta fue enviada para validación")  
                const URL= await uploadFiles(image,category)     
                console.log(URL) 
                       
               // const nuevaURL='https://firebasestorage.googleapis.com/v0/b/carreradementes-93f01.appspot.com/o/Ciencias%2FCaptura%20de%20pantalla%20(17).png?alt=media&token=b0bab16a-6252-46a8-b41b-0507df4e9282'
                dispatch(newQuestion({
                    question,
                    category,               
                    answer,
                    false1,
                    false2,            
                    false3,            
                    image,
                    email
                }))
                setQuestion("")
                setAnswer("")
                setF1("")
                setF2("")
                setF3("")
                setImg("")
                setTimeout(() => {setMSG("")}, 2300);
            }
        }
    }

    if (autenticado) {
        return (
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h3>Crear nueva pregunta</h3>
                    <div className='formName'>
                        <label>Pregunta*</label>
                        <div>
                            <input className={errorQuestion !== "" ? 'danger' : "inputName"} name="question" type="text" value={question} onChange={(e) => validation(e)} />
                            {errorQuestion ? <p className='error'>{errorQuestion}</p> : null}
                        </div>
                    </div>
                    <div>
                        <label>Categoria*</label>
                        <div>
                            <select onChange={(e) =>handleCategory(e)} name="" id="categories">
                                {
                                    falseCategories.length > 0 &&
                                    falseCategories.map((e, index) => (
                                        <option key={index} value={e}> {e} </option>
                                    )
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className='formMail'>
                        <label>Respuesta correcta*</label>
                        <div>
                            <input className={errorAnswer !== "" ? 'danger' : "inputEmail"} name="answer" type="text" value={answer} onChange={(e) => validation(e)} />

                        </div>
                    </div>
                    <div className='formMail'>
                        <label>Respuesta falsa 1*</label>
                        <div>
                            <input className={errorAnswer !== "" ? 'danger' : "inputEmail"} name="false1" type="text" value={false1} onChange={(e) => validation(e)} />

                        </div>
                    </div>
                    <div className='formMail'>
                        <label>Respuesta falsa 2*</label>
                        <div>
                            <input className={errorAnswer !== "" ? 'danger' : "inputEmail"} name="false2" type="text" value={false2} onChange={(e) => validation(e)} />

                        </div>
                    </div>
                    <div className='formMail'>
                        <label>Respuesta falsa 3*</label>
                        <div>
                            <input className={errorAnswer !== "" ? 'danger' : "inputEmail"} name="false3" type="text" value={false3} onChange={(e) => validation(e)} />
                        </div>
                    </div>                    
                    <div className='formMail'>
                        <label>URL de Imagen*</label>
                        <DragDrop img={image} setImg={setImg} validation={validation}/>
                    </div>
                    {errorAnswer ? <p className='error'>{errorAnswer}</p> : null}
                    {errorTotal ? <p className='error'>{errorTotal}</p> : null}
                    <div className='FormSubmit' >

                        <div className='checkbox'><input type="checkbox" id="check" value={terminos} onClick={() => handleTerms()} />
                            <label>
                                He leído y acepto las <button onClick={(e) => conditions(e)}>condiciones</button>
                            </label>
                        </div>
                            <div className="terminos">
                                <ul>
                                    <li> Recomendamos verificar la veracidad de la respuesta enviada como "correcta".
                                    </li>
                                    <li> No se permiten palabras ofensivas.
                                    </li>
                                    <li> El incumplimiento de lo anterior podría incurrir en la sanción de su cuenta
                                    </li>
                                    </ul></div>
                        <input disabled={!question || !terminos || errorQuestion || errorAnswer || image===null || errorTotal} className={!question || !terminos || errorQuestion || errorAnswer || errorTotal || image===null ?
                            "disabled" : "enabled"} type="submit" value="Enviar pregunta" />
                    </div>
                    {msg ? <p>{msg}</p> : null}
                </form>
                <Link to="/home"><button className='volver' >← Volver atras </button></Link>

            </div>
        );
    } else {
        history.push('/')
        return <div></div>
    }
}



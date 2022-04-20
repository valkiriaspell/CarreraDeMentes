
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyQuestion } from '../../redux/actions';

export default function ChangeQuestion({selectedQuestion, setShowForm, refresh}) {
    const dispatch = useDispatch();    
    let allQuestions = useSelector(state => state.questions)
    
    const quest = allQuestions.find(q => q.id == selectedQuestion)

 

     //////////  ---->    Local states data   <------ //////////////
     const [question, setQuestion] = useState(quest.question);
     const [category, setCategory] = useState(quest.category);
     const [answer, setAnswer] = useState(quest.answer);
     const [false1, setF1] = useState(quest.false1);
     const [false2, setF2] = useState(quest.false2);
     const [false3, setF3] = useState(quest.false3);
     const [image, setImg] = useState(quest.image);
     const [msg, setMSG] = useState("");
    

     

      //////////  ---->    Local states errors   <------ //////////////
    const [errorQuestion, setErrorQ] = useState("")
    const [errorAnswer, setErrorA] = useState("")
    const [errorImage, setErrorImage] = useState("")
    const [errorTotal, setErrorTotal] = useState("")
    
    let falseCategories = ["Música", "Deporte", "Cine", "Arte", "Ciencias", "Geografía", "Historia"]
     //////////////// ---->    VALIDATIONS    <------ /////////////

    function validation(e) {

        switch (true) {

            case e.target.name === "question":
                if (!/^\¿.*?\?$/.test(e.target.value)) {
                    setQuestion(e.target.value);
                    setErrorQ("Colocar signos ¿? correctamente")

                } else if (e.target.value.length > 90) {
                    setQuestion(e.target.value);
                    setErrorQ("Máximo 90 carácteres")
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
//////////////// ---->    FUNCTIONS   <------ /////////////
    function handleCategory(e) {
        setCategory(e.target.value)
    }
  
     //////////  ---->    on Submit   <------ //////////////
     const onSubmit = (e) => {
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
                setMSG("La pregunta fue modificada")                
                dispatch(modifyQuestion({
                    id: quest.id,
			question,
			answer,
			false1,
			false2,
			false3,
			category,
			image
		}))                
                setTimeout(() => {
                    setShowForm(false)
                    refresh()
                }, 3000);
            }
        }
    }
       
    
    return (
        <div>
            <div className='form'>
            <button className='botonesBarra' id="refresh" onClick={(e) => refresh(e)}>Cancelar</button>
            <span>Estás modificando la pregunta ID {selectedQuestion}</span>...
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
                        <label>Categoría*</label>
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
                        <div>
                            <input className={errorImage !== "" ? 'danger' : "inputEmail"} name="image" type="text" value={image} onChange={(e) => validation(e)} />
                            {errorImage ? <p className='error'>{errorImage}</p> : null}
                        </div>
                        
                        {image ? <div className='vistaImagen'><img height={150} src={image}/> </div> : null}
                    </div>
                    {errorAnswer ? <p className='error'>{errorAnswer}</p> : null}
                    {errorTotal ? <p className='error'>{errorTotal}</p> : null}
                    <div className='FormSubmit' >                       
                            
                        <input disabled={!question || errorQuestion || errorAnswer || errorImage || errorTotal} className={!question || errorQuestion || errorAnswer || errorTotal || errorImage ?
                            "disabled" : "enabled"} type="submit" value="Enviar pregunta" />
                    </div>
                    {msg ? <p>{msg}</p> : null}
                </form>
        </div>
        </div>
    )
}
import React,{useEffect,useState} from "react";
import "../../STYLES/dragdrop.css"

function DragDrop(){
    const [image, setImage] = useState({});
    useEffect(() => {
        const dropArea= document.getElementById("drop-area")
        console.log(dropArea)
        const [button]= dropArea.getElementsByClassName('button')
        console.log(button)
        const input= dropArea.querySelector('#input-file')
        console.log(input)
        let files;
        //cuando toco el boton
        button.addEventListener("click",(e)=>{
            e.preventDefault()
            input.click();
        });
        //cuando el input de "archivo" se modifica
        input.addEventListener('change',()=>{
            files=input.files;
            showFiles(files);    
        });
        // se necesita para que funcione la dropzone
        dropArea.addEventListener('dragover',(e)=>{
            e.preventDefault()
            console.log("encima")
        })
        // se necesita para que funcione la dropzone
        dropArea.addEventListener('dragLeave',(e)=>{
            e.preventDefault()
            console.log("afuera")
        })
        //cuando tiro archivos a la dropzone
        dropArea.addEventListener('drop',(e)=>{
            console.log('aca');
            e.preventDefault();
            files=e.dataTransfer.files;
            showFiles(files);
        });
        return () => {
          
        };
    }, []);
    
    //veo si son muchos archivos o solo uno
    function showFiles(files){
        console.log(files)
        if(files.length=== 1){
            processFile(files[0]);
        }else{
            console.log("solo se puede cargar un archivo por pregunta")
        }
    }
    //funcion que muestra los archivos en lista
    function processFile(file){
        const fileType=file.type;
        console.log(fileType)
        const extens=['image/jpeg','image/jpg','image/png']
        if(extens.includes(fileType)){
            const fileReader= new FileReader();
            const id= `file-${Math.random().toString(32).substring(7)}`

            fileReader.addEventListener('load',()=>{
                const fileURL=fileReader.result
                setImage({
                    URL:fileURL,
                    id:id,
                    name:file.name
                })
            })

            fileReader.readAsDataURL(file);//carga el archivo y cae en el listener
            upLoadFile(file,id)//envia el archivo al back
        }else{
            alert('fromato de archivo no permitido')
        }
    }

    async function upLoadFile(file,id){//envia el archivo al back
        console.log(id)
        const formData= new FormData()
        formData.append('file',file)
        try {
            const response= await fetch('http://localhost:3000/upload',{
                method:"POST",
                body:formData
            });
            const responseText= await response.text
            console.log(responseText)
            const x= document.querySelector(`#${id} .status-text`)
            console.log(x)
            x.innerHTML='<span>cargado correctamente</span>'
        } catch (error) {
            const y=document.querySelector(`#${id} .status-text`)
            console.log(y)
            y.innerHTML='<span>no se pudo enviar el archivo</span>'        
        }

    }

    return(
        <div>
            <div className="drop-area" id="drop-area">
                <h2 style={{fontSize:"100%"}}>arrastra y suelta imagenes</h2>
                <span>o</span>
                <button className="button">selecciona uno o varios archivos</button>
                <input type="file" id="input-file" hidden multiple></input>                    
            </div>
                <div id="preview">
                    {image.id?
                    <div id={image.id} className="file-container" style={{display:"flex"}}>
                    <img src={image.URL} alt={image.name} width="50"/>
                    <div className="status">
                        <span>{image.name}</span>
                        <span className="status-text">
                                Loading...
                        </span>
                    </div>
                </div>
                    :<></>}
                </div>
        </div>
    )
}

export default DragDrop
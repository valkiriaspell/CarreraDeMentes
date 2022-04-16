import React,{useEffect,useState} from "react";
import "../../STYLES/dragdrop.css"
import Swal from 'sweetalert2';
import {uploadFiles} from '../../../utils/Firebase'

function DragDrop(props){
    const [image, setImage] = useState({});
    useEffect(() => {
        const dropArea= document.getElementById("drop-area")
        const [button]= dropArea.getElementsByClassName('button')
        const input= dropArea.querySelector('#input-file')
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
        })
        // se necesita para que funcione la dropzone
        dropArea.addEventListener('dragLeave',(e)=>{
            e.preventDefault()
        })
        //cuando tiro archivos a la dropzone
        dropArea.addEventListener('drop',(e)=>{
            e.preventDefault();
            files=e.dataTransfer.files;
            showFiles(files);
        });
        return () => {
          
        };
    }, []);
    
    //veo si son muchos archivos o solo uno
    function showFiles(files){
        if(files.length=== 1){            
            processFile(files[0]);
        }else{
            Swal.fire({
                icon: "error",
                title:
                  "solo se puede cargar un archivo por pregunta",
                showConfirmButton: true,
                heightAuto: false,
                timer: 3000,
              });
        }
    }
    //funcion que muestra los archivos en lista
    function processFile(file){
        const fileType=file.type;
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
            upLoadFile(file)//envia el archivo al back
        }else{
            Swal.fire({
                icon: "error",
                title:
                  "fromato de archivo no permitido",
                showConfirmButton: true,
                heightAuto: false,
                timer: 3000,
              });
        }
    }

function upLoadFile(file){//envia el archivo al back
        const formData= new FormData()

        formData.append('file',file) 
        props.setImg(file)
    }

    return(
        <div>
            <div className="drop-area" id="drop-area">
                <h2 style={{fontSize:"100%"}}>arrastra y suelta imagenes</h2>
                <span>o</span>
                <button className="button">selecciona una imagen</button>
                <input type="file" id="input-file" hidden multiple></input>                    
            </div>
                <div id="preview">
                    {props.img?
                    <div id={image.id} className="file-container" style={{display:"flex"}}>
                    <img src={image.URL} alt={image.name} width="50"/>
                    <div className="status">
                        <span>{image.name}</span>
                        <span className="status-text">
                            cargado correctamente
                        </span>
                    </div>
                </div>
                    :<></>}
                </div>
        </div>
    )
}

export default DragDrop
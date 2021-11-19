import React,{useEffect, useState} from "react";
import { helpHttp } from "../Helpers/helphttp";
import AplicacionCrudForm from "./AplicacionCrudForm";
import AplicacionCrudTable from "./AplicacionCrudTable";
import MessageApi from "./MessageApi";
import "./hola.css"



const ApiCrud = () => {
    // se inicializa bacia, en db se guardan los datos
    const [db,setDb] = useState([]);

    const [dataToEdit,setDataToEdit] = useState(null);

    const [error,setError] = useState(null);
    //si es null, va a ser una insercion, sino es una edicion
    const [loading, setLoading] = useState(false);
    // se invoca helpHttp
    let api=helpHttp();
    // se define el endpoint
    let url= "http://localhost:3000/contactos";

    //mostamos la respuesta en la UI
    useEffect(()=>{
        //actualiza la variable setLoading a VERDADERO  para que se vea
            setLoading(true);
        //usamos el metodo GET del Helper
            helpHttp().get(url).then((res)=>{
        //cuando la respuesta no tenga una propiedad llamada error, actualizará la variable db con la respuesta arrojada por la petición
                if(!res.err){
                    setDb(res)
        //si no salto error, la variable se pasa a null
                    setError(null);
                }else{
        //si hay un error en la bbdd la misma no se mostrara
                    setDb(null);
                    setError(res)
                }
        //al terminar la peticion GET vuelve a falso
            setLoading(false);
            });
            },[url]);
    

    const createData =(data)=>{
        data.id= Date.now(); //para crear un id en el campo
        let options={
            body:data,
            headers:{"content-type":"application/json"},
        };
        api.post(url,options).then(res=>{
            console.log(res);
            if(!res.err){
                setDb([...db,res ])
            }else{
                setError(res);
            }
        });
        
        //trae la base de datos como esta

    };
    const updateData =(data)=>{
        let endpoint =`${url}/${data.id}`;
        console.log(endpoint);

        let options={
            body:data,
            headers:{"content-type":"application/json"},
        };
        api.put(endpoint,options).then((res)=>{
            console.log(res);
            if(!res.error){
                let newData= db.map(el=>el.id ===data.id? data:el);
                setDb([...db,res ]);
                setDb(newData);
            }else{
                setError(res)
            }
            
        });
        //trae la base de datos como esta

    };
    // let newData= db.map(el=>el.id ===dato.id? data:el);
    // setDb(newData);


    const deleteData = (id) => {
      let isDelete = window.confirm(`¿Estás seguro de eliminar el registro con el id '${id}'?`);
      if (isDelete) {
          let endpoint = `${url}/${id}`;
          let options = {
          headers: { "content-type": "application/json" },
        };
  
        api.del(endpoint, options).then((res) => {
          //console.log(res);
          if (!res.err) {
            let newData = db.filter((el) => el.id !== id);
            setDb(newData);
          } else {
            setError(res);
          }
        });
      } else {
        return;
      }
    };
//     const deleteData = (id) => {
//         let isDelete = window.confirm(
//       `¿Estás seguro de eliminar el registro con el id '${id}'?`
//     );

//     if (isDelete) {
//       let newData = db.filter((el)=>el.id!==id);
//       setDb(newData);
//       }else{
//         return;
//     };
//   }
    return(
        <div class="hola">
            <h2 class="hola"> Nuevo Morosos </h2>
            <AplicacionCrudForm
            createData = {createData}
            updateData = {updateData}
            dataToEdit = {dataToEdit}
            setDataToEdit={setDataToEdit}
            />
            {loading} 
            {error&& <MessageApi/>}
            <AplicacionCrudTable
            data={db}
            deleteData={deleteData}//funcion que actualiza la variable, deleteData
            setDataToEdit={setDataToEdit}//funcion que actualiza la variable, setDataToEdit
            />

        </div>
    )

}

export default ApiCrud;
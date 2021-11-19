
import React,{useState,useEffect} from "react";


const initialForm = {
    nombreContacto:"",
    apellidoContacto:"",
    emailContacto:"",
    id:null,
};

const AplicacionCrudForm =({createData,updateData,dataToEdit,setDataToEdit}) =>{ 
    const [form,setForm]= useState(initialForm);

    useEffect(()=>{//actualiza eñ esta del formulario con los datos a editar
        if(dataToEdit){
            setForm(dataToEdit);//Asigna al formulario los datos del registro a editar
        }else{
            setForm(initialForm);
        }
    },[dataToEdit]);
    // Permite editar los datos 
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }
    // envia los datos a la base si estan completos
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!form.nombreContacto||!form.apellidoContacto||!form.emailContacto){
            alert ("Datos incompletos");
            return;
        }
        if (form.id===null){
            createData(form);
        }else{
            updateData(form);
        }
        handleReset();
    }
    
    
    // limpia los campos
    const handleReset = (e)=>{
        setForm(initialForm);
        setDataToEdit(null);
    }

    return(
        <div>
            <h3>{dataToEdit? "Editar":"Agregar"} </h3>
            {/* introduce inputs y botones */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombreContacto" placeholder="Nombre Contacto" onChange={handleChange} value={form.nombreContacto} class="campos"/>
                <input type="text" name="apellidoContacto" placeholder="Apellido Contacto" onChange={handleChange} value={form.apellidoContacto}class="campos"/>
                <input type="text" name="emailContacto" placeholder="Email Contacto" onChange={handleChange} value={form.emailContacto}class="campos"/>
                <br></br>
                <input type="submit" value="Enviar" class="button"/>
                <input type="reset" value="Limpiar" onClick={handleReset} class="button"/>
            </form>
        </div>
    )
};
export default AplicacionCrudForm;
import React from "react";
import AplicacionCrudTableRow from "./AplicacionCrudTableRow";
import "./hola.css"

const AplicacionCrudTable = ({data, setDataToEdit, deleteData}) => {
    return(
        <div class="hola">
            <div class="titulo">
            
            <h3>Datos de morosos incobrables</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {/* Se valida si mapea el AplicacionCrudTableRow o si se muestra los datos en blanco */}
                <tbody>
                    {(data.length ===0) ? <tr><td colSpan="3">Sin Datos</td></tr>:(data.map((el)=> <AplicacionCrudTableRow 
                    key={el.id} el={el}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData} 
                    />))}
                </tbody>
            </table>
        </div>
    )
};
export default AplicacionCrudTable;
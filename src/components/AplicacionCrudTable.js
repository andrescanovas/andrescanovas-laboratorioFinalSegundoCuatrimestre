import React from "react";
import AplicacionCrudTableRow from "./AplicacionCrudTableRow";
import "./hola.css"

const AplicacionCrudTable = ({data, setDataToEdit, deleteData}) => {
    return(
        <div class="hola">
            <h3>Datos de morosos incobrables</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(data.length ===0) ? <tr><td colSpan="3">Sin Datos</td></tr>:(data.map((el)=> <AplicacionCrudTableRow 
                    key={el.id} el={el}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData} 
                    />))};
                </tbody>
            </table>
        </div>
    )
};
export default AplicacionCrudTable;
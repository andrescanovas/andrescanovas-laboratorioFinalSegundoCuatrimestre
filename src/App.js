import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ApiCrud from './components/ApiCrud';
// import AplicacionCrudApp from "./components/AplicacionCrudApp" ;



function App() {
  return (
    <div class="hola">
      <div class="titulo">
      <h1 >Aplicacion con React</h1>
      </div>
      <ApiCrud/>

      {/* <AplicacionCrudApp/> */}
    </div>
  );
}

export default App;

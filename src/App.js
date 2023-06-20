import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "noty/lib/noty.css";  
import "noty/lib/themes/bootstrap-v4.css";
import "noty/lib/themes/mint.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login.jsx';
import Inicio from './components/Inicio.jsx';
import Gallos from './components/Gallos.jsx';
import NuevoGallo from './components/NuevoGallo';
import Batallas from './components/Batallas';
import Combate from './components/Combate'
import Resumen from './components/Resumen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element={<Login />} />
        <Route path='/inicio' element={<Inicio />}  />
        <Route path='/gallos' element={<Gallos/>} />
        <Route path='/nuevogallo' element={<NuevoGallo/>}/>
        <Route path='/batallas' element={<Batallas/>}/>
        <Route path='/combate' element={<Combate/>}/>
        <Route path='/resumen' element={<Resumen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

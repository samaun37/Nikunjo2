import logo from './logo.svg';
import './App.css';
import React ,{useState, useEffect}from 'react';
import {Routes, Route} from 'react-router-dom'
import { HomePage } from './Homepage';
import { AddToLet } from './AddToLet';


function App() {
  return (
    <>
    <nav style={{ background: 'lightgray', padding: '10px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li><a href="/">Nikunjo</a></li>
        <li><a href="/addToLet">Add ToLet</a></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addToLet" element={<AddToLet />} />
    </Routes>
    </>
  );
}

export default App;

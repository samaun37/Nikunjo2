import './App.css';
import {useState,React} from 'react';
import {Routes, Route} from 'react-router-dom';
import { HomePage } from './Homepage';
import { AddToLet } from './AddToLet';
import Navbar from './components/Navbar';
import { SignIn } from './components/SignIn';
import Tolet from './Tolet'
function App() {
  return (
    <>
    <Navbar/>  {/*click onujayi ekta href dibe. oi href er sathe jei path er match hobe oi element a jabe*/}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addToLet/*" element={<AddToLet />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/card/:id" element = {<Tolet  />} />
    </Routes>
    
    </>
  );
}
//  <Route path="/user/:userId/:action" element={<UserDetails />} />   (in case of multiple key value pair in url)


export default App;

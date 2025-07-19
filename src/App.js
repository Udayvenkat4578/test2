import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Adjust the import path as needed
import Landing from './Components/Landing';
import Donors from './Components/Donors';
import Donate from './Components/Donate'
import Emergency from './Components/Emergency'
import Login from './Components/Login'
import Signup from './Components/Signup';
import "leaflet/dist/leaflet.css";
import Company from './Components/Company';
import Footer from './Components/Footer';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/donors" element={<Donors/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/emergency" element={<Emergency/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/company" element={<Company/>}/>
                <Route path="/Signup" element={<Signup/>} />



      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

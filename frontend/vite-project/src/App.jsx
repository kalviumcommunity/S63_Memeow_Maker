// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, LandingPage, ManageEntity, UpdateEntities } from './routes'; // Remove Demo import
import Navbar from './components/Navbar.jsx'; // Import the Navbar component
import "./App.css";
import "./styles/main.css"; // Import the main CSS file
import "./styles/animations.css"; // Import animations CSS file

const App = () => {
    return (
        <BrowserRouter>
            <Navbar /> {/* Render the Navbar here */}
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/LandingPage' element={<LandingPage/>} />
                    <Route path='/Update/:id' element={<UpdateEntities/>} />
                    <Route path='/ManageEntity' element={<ManageEntity/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
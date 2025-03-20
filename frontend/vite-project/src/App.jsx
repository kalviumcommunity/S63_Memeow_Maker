// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, LandingPage, ManageEntity, UpdateEntities} from './routes'; // Ensure these components are correctly imported
import Navbar from './components/Navbar.jsx'; // Import the Navbar component
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar /> {/* Render the Navbar here */}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/LandingPage' element={<LandingPage/>} />
                <Route path='/Update/:id' element={<UpdateEntities/>} />
                <Route path='/ManageEntity' element={<ManageEntity/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
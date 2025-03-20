// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    return (
        <nav>
            <ul>
                <h1>MEMEOW MAKER</h1>
                <li><Link to="/">Add Entity</Link></li>
                <li><Link to="/LandingPage">Landingpage</Link></li>
                <li><Link to="/ManageEntity">ManageEntity</Link></li>
                {/* <li><Link to="/UpdateEntities">UpdateEntities</Link></li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
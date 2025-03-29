// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <div className="logo-container">
                    <h1>
                        <span role="img" aria-label="cat emoji">😸</span> MEMEOW MAKER
                    </h1>
                </div>
                <div className="nav-links">
                    <li><Link to="/">Add Entity</Link></li>
                    <li><Link to="/LandingPage">Landing Page</Link></li>
                    <li><Link to="/ManageEntity">Manage Entities</Link></li>
                    {/* <li><Link to="/UpdateEntities">UpdateEntities</Link></li> */}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
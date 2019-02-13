import React from 'react';
import logo from '../../assets/img/logo.svg';

// Navbar
const navbar = () => {
    return (
        // Navbar
        <div className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Object Detection" title="Object Detection" />
          </a>
        </div>
    )
}

export default navbar;
import React from 'react';

// Sidebar
const Sidebar = () => {
    return (
        <div>
        {/* Sidebar */}
        <ul className="sidebar navbar-nav">
            
            {/* Dasbboard */}
    
            {/* Object Detection Menu */}
            <li className="nav-item dropdown mt-2">
              <button className="btn btn-nav nav-link dropdown-toggle" id="pagesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="far fa-image pr-2"></i>
                <span>Object Detection</span>
              </button>
              <div className="dropdown-menu" aria-labelledby="pagesDropdown">

                {/* Media */}
                <h6 className="dropdown-header">Media</h6>
                <a className="dropdown-item" href="/gallery" alt="Media Library">Gallery</a>
                <a className="dropdown-item" href="/upload" alt="Upload Media">Upload</a>
                <div className="dropdown-divider"></div>

                {/* Settings */}
                <h6 className="dropdown-header">Settings</h6>
                <a className="dropdown-item" href="/settings" alt="Settings">AWS Settings</a>
                
              </div>
            </li>
            
          </ul>
      </div>
    )
};

export default Sidebar;

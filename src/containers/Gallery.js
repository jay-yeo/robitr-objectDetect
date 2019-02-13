import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Library from '../components/Library/Library';

// Media Gallery
const Gallery = () => {
    return(
        <div>
            <Navbar></Navbar>

            {/* Page Wrapper */}
            <div id="wrapper">

                <Sidebar></Sidebar>

                {/* Content */}
                <div id="content-wrapper">

                    {/* Page Content */}
                    <div className="container-fluid">

                        {/* Page Header */}
                        <div className="row">
                            <div className="col-12">
                                <Breadcrumb name={'Gallery'}></Breadcrumb>
                            </div>
                        </div>
                        
                        {/* Page Area */}
                        <Library/>

                    </div>
                    {/* /Page Content */}

                    {/* Footer */}
                    <Footer></Footer>

                </div>
                {/* /Content */}

            </div>
            {/* /Wrapper */}
        </div>
    )
}

export default Gallery;
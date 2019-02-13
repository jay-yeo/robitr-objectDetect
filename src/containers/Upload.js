import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import UploadForm from '../components/Upload/Upload';

// Upload Page
const Upload = (props) => {

    return (
        <div className="Upload">
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
                                <Breadcrumb name={'Upload'}></Breadcrumb>
                            </div>
                        </div>
                        
                        {/* Page Area */}
                        <div className="row px-3">
                            <div className="col-12">
                                <h5>Upload Files</h5>
                                <p><strong className="pr-2">S3 Bucket:</strong><span className="text-muted">{props.bucket}</span></p>
                            </div>
                            {/* Item */}
                            <div className="col-12 text-left">
                                <UploadForm />
                            </div>
                        </div>

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

export default Upload;
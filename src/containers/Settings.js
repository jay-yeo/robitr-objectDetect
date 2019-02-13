import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

// AWS Settings
const Settings = () => {

    // Obscure Secret Access Key
    const accessSecret = process.env.REACT_APP_SECRET_ACCESS_KEY.slice(0, -20);
    
    return(
        <div className="Settings">
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
                                <Breadcrumb name={'Settings'}></Breadcrumb>
                            </div>
                        </div>
                        
                        {/* Page Area */}
                        <div className="row py-3 text-left">
                            {/* Item */}
                            <div className="col-6">
                                <h2>Settings</h2>
                                <hr></hr>
                                <p>To adjust the following configuration settings, please edit the <code>.env</code> file located in the project root directory.</p>
                                
                                <ul class="list-group pb-3">
                                    <li class="list-group-item">
                                        <small className="text-muted">Access Key ID</small>
                                        <br/>{process.env.REACT_APP_ACCESS_KEY_ID}
                                    </li>
                                    <li class="list-group-item">
                                        <small className="text-muted">Secret Access Key</small>
                                        <br/>{accessSecret}<strong className="bg-secondary text-light px-1">xxxxxxxxxxxxxxxxxxxx</strong>
                                    </li>
                                    <li class="list-group-item">
                                        <small className="text-muted">S3 Bucket</small>
                                        <br/>{process.env.REACT_APP_BUCKET}
                                    </li>
                                    <li class="list-group-item">
                                        <small className="text-muted">Role ARN</small>
                                        <br/>{process.env.REACT_APP_ROLE_ARN}
                                    </li>
                                    <li class="list-group-item">
                                        <small className="text-muted">SNS Topic ARN</small>
                                        <br/>{process.env.REACT_APP_SNS_TOPIC_ARN}
                                    </li>
                                </ul>
                                
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

export default Settings;
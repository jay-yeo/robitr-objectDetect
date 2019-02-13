import React, { Component } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Upload from '../components/Upload/Upload'
import Library from '../components/Library/Library';

// AWS SDK
var AWS = require('aws-sdk');

// Other Packages
var uuid = require('uuid');

// AWS Credentials
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region:'us-east-1'
});

// Dashboard
class Dashboard extends Component {
    // Constructor
    constructor(props) {
        super(props);

        // State
        this.state = {
            bucketName: process.env.REACT_APP_BUCKET,
            uploadStatus: [],
            s3Objects: [], 
            jobID: [],
            labelResults: [],
            labelCounter: null,
            detectionStatus: false,
            showMedia: false,
            showLabels: false,
            showUploadStatus: false,
            uploadSpinner: false,
            detectionSpinner: false,
            showDownload: false,
            downloadLink: null,
            rawJSON: null
        }

    }

    // List S3 Media Files
    listMedia = () => {

        // S3 Bucket
        let bucketName = process.env.REACT_APP_BUCKET;

        let s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: bucketName}
        });


        s3.listObjects({
            Delimiter: '/'
        }, function(err, data) {
            // Throw error
            if (err) {
            console.log(err);
            }
            // console.log(data);
            
            this.setState({
                s3Objects: data.Contents,
            })

        }.bind(this));
    
    }
    

    // Upload media to S3 Bucket
    uploadMedia = () => {

        // S3 Bucket
        const bucketName = process.env.REACT_APP_BUCKET;

        let s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: bucketName}
        });

        // Upload Form
        var files = document.getElementById('upload').files;

        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            let fileName = file.name;
            let fileExt = fileName.split('.').pop();
            let photoKey = 'robitr-asset-' + uuid.v4() + '.' + fileExt;
            
            s3.upload({
                Key: photoKey,
                Body: file,
                ACL: 'public-read'
                }, function(err, data) {
                
                // Throw error
                if (err) {
                    console.log(err);
                    return alert('There was an error uploading your photo: ', err.message);
                }

                // Set uploadStatus Message
                this.handleUploadEvent(data);

                }.bind(this)
            );
        }
    }

    // Delete media from S3 Bucket
    deleteMedia = (fileKey) => {
        // S3 Bucket
        let bucketName = process.env.REACT_APP_BUCKET;
    
        let s3 = new AWS.S3({
            apiVersion: '2006-03-01',
        });
    
        var params = {
          Bucket: bucketName,
          Key: fileKey,
        };
    
        s3.deleteObject(params, function(err, data) {
          if (err) console.log(err, err.stack); 
          else
            this.listMedia();
            console.log(data);           
        
        }.bind(this));
    
    }

    resetState = () => {
        this.setState({
            uploadStatus: [],
            jobID: [],
            labelResults: [],
            detectionStatus: false,
            showMedia: false,
            showLabels: false,
            uploadSpinner: false,
            detectionSpinner: false
        })
    }


    // Handle delete click
    handleDeleteClick = (fileKey) => {
        this.deleteMedia(fileKey);
               
    }

    // Handle upload click
    handleUploadClick = () => {
        this.resetState();
        this.setState({
            uploadSpinner: true,
        })
        this.uploadMedia();
        
        
    }

    // Handle events on upload completion
    handleUploadEvent(data) {
        
        // Add file to array
        let fileInfo = {Location: data.Location, File: data.Key};
        let fileArray = this.state.uploadStatus;
        fileArray.push(fileInfo);

        this.setState({
            uploadStatus: fileArray,
            uploadSpinner: false,
            showUploadStatus: true,
        })

        this.listMedia();

        setTimeout(() => {
            this.setState({
                showUploadStatus: false
            });
        }, 9000);
    }

    // Refresh
    componentDidMount() {
        this.listMedia();
    }

    render() {
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
                            <div className="row px-3 pb-3">
                                <div className="col-12">
                                    <h3>Object Detection</h3>
                                </div>
                            </div>
                            
                            {/* Upload Form */}
                            <div className="row px-3">
                                <div className="col-12">
                                    <h5>Upload Files</h5>
                                    <p><strong className="pr-2">S3 Bucket:</strong><span className="text-muted">{this.state.bucketName}</span></p>
                                </div>
                                {/* Item */}
                                <div className="col-12 text-left">
                                    <Upload />
                                </div>
                            </div>

                            <hr/>

                            {/* Item View */} 
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

}

export default Dashboard;
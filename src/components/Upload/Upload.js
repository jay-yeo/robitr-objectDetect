import React, { Component } from 'react';

import Loader from '../../assets/img/loader.gif';

// AWS SDK
var AWS = require('aws-sdk');
var uuid = require('uuid');

// AWS Credentials
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region:'us-east-1'
});


// Upload
class Upload extends Component {
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
        } else {
            
            this.setState({
                uploadSpinner: true,
            })

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
    
                let fileName = file.name;
                let fileExt = fileName.split('.').pop();
                let photoKey = 'media-' + uuid.v4() + '.' + fileExt;
                
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

    }

    handleUploadClick = () => {
        this.resetState();
        this.uploadMedia();
    }

    resetState = () => {
        this.setState({
            uploadStatus: [],
            uploadSpinner: false,
        })
    }

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

        setTimeout(() => {
            this.setState({
                showUploadStatus: false
            });
        }, 9000);
    }
    
    render() {
        return (
            <div className="row py-3">
                <div className="col-md-auto text-left">
                    <form>
                        <div className="upload-btn-wrapper">
                            <button className="btn btn-outline-secondary">Upload<i className="fas fa-arrow-up pl-1"></i></button>
                            <input id="upload" type="file" name="files[]" onChange={this.handleUploadClick} multiple />
                        </div>
                    </form>
                </div>
                <div className="col-md-auto">
                    {this.state.uploadSpinner ? <div className="pt-2" height="26px"><img className="pr-1 align-middle" src={Loader} height="26px" alt="Uploading..." /> <span className="text-muted mt-1">Uploading...</span></div> : null}
                    {this.state.showUploadStatus ?
                        this.state.uploadStatus.map((item, key) =>
                        <span key={item.File} className="pt-2 d-block"><i className="fas fa-check-square pr-2 text-success"></i><strong className="pr-3">SUCCESS</strong> <span className="text-muted text-monospace">{item.File}</span></span>
                    ) : null}
                </div>
            </div>
        )    
    }
    
}

export default Upload;


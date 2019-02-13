import React, { Component } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Media from '../components/Media/MediaItem';
import Dataview from '../components/Dataview/Dataview';

// AWS SDK
var AWS = require('aws-sdk');
var uuid = require('uuid');

// AWS Credentials
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region:'us-east-1'
});

// ObjectDetect
class ObjectDetect extends Component {
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
            rawJSON: null,
            file: this.props.mediaInfo.match.params.id
        }

    }
    
    // Delete media from S3 Bucket
    deleteMedia = (fileKey) => {
        // S3 Bucket
        let bucketName = process.env.REACT_APP_BUCKET;
    
        // S3 Instance
        let s3 = new AWS.S3({
            apiVersion: '2006-03-01',
        });
    
        // S3 Params
        var params = {
          Bucket: bucketName,
          Key: fileKey,
        };
    
        // Delete object from Bucket
        s3.deleteObject(params, function(err, data) {
          if (err) console.log(err, err.stack); 
          else
            // this.listMedia();
            console.log(data);           
        
        });
    
    }

    // Start object detection for image files (JPEG or PNG)
    startImageRekognition = (fileName) => {
        
        // Rekognition
        var rekognition = new AWS.Rekognition();

        // Params
        var params = {
            Image: { 
              S3Object: {
                Bucket: process.env.REACT_APP_BUCKET,
                Name: fileName
              }
            },
            MinConfidence: 0.0
          };

        rekognition.detectLabels(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // error
            } else {
                console.log(data); // success
                this.setState({
                    rawJSON: data,
                    labelResults: data.Labels,
                    labelCounter: data.Labels.length,
                    detectionSpinner: false,
                    detectionStatus: true,
                })

                this.downloadJSON(data);
            }
        }.bind(this));
    }

    // Start object detection for video files (MP4)
    startVideoRekognition = (fileName) => {
        // Rekognition
        var rekognition = new AWS.Rekognition();

        // Params
        var params = {
            Video: { 
                S3Object: {
                    Bucket: process.env.REACT_APP_BUCKET,
                    Name: fileName
                }
            },
            JobTag: 'ROBITR-JOBTAG-' + uuid.v4(),
            MinConfidence: 0.0,
            NotificationChannel: {
                RoleArn: process.env.REACT_APP_ROLE_ARN, // Role ARN
                SNSTopicArn: process.env.REACT_APP_SNS_TOPIC_ARN // SNS ARN
            }
        };

        rekognition.startLabelDetection(params, function(err, data) {
            if (err) 
                console.log(err, err.stack); // error 
            else
                // Console     
                console.log("Label Detection Started - JobID: " + data.JobId); // success

                // Set state
                this.setState({
                    jobID: data.JobId,
                })

                // Handle results callback
                this.handleGetRekognitionResults(data.JobId);

        }.bind(this));
    }

    // Get Data Labels
    getRekognitionLabels = (jobID) => {
        // Rekognition
        var rekognition = new AWS.Rekognition();

        // Params
        var params = {
            JobId: jobID,
            SortBy: "TIMESTAMP"
        };

        // Get Label Detection results
        rekognition.getLabelDetection(params, function(err, data) {
            if (err) 
                console.log(err, err.stack); // error
            else
                // Success
                if (data.JobStatus !== "IN_PROGRESS") {
                    
                    this.setState({
                        rawJSON: data,
                        labelResults: data.Labels,
                        labelCounter: data.Labels.length,
                        detectionSpinner: false
                    })

                    this.downloadJSON(data);

                }    
        }.bind(this));
    }

    // Check if Rekognition complete
    checkRekognitionStatus = (jobID) => {
        // Rekognition
        var rekognition = new AWS.Rekognition();

        // Params
        var params = {
            JobId: jobID,
            SortBy: "TIMESTAMP"
        };

        rekognition.getLabelDetection(params, function(err, data) {
            if (err) 
                console.log(err, err.stack); // error
            else
                console.log(data.JobStatus); // success
                    
                if (data.JobStatus !== "IN_PROGRESS") {
                    
                    this.setState({
                        detectionStatus: true
                    })

                }
     
        }.bind(this));
    }

    // Download JSON function
    downloadJSON = (obj) => {
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

        this.setState({
            downloadLink: 'data:' + data,
        })

    }


    // Handle Download JSON Click
    handleDownloadClick = (data) => {
        this.downloadJSON(data);
    }

    // Handle Show Labels click
    handleShowLabelsClick = () => {
        this.setState({
            showLabels: true,
        });
    }

    // Handle Get Rekognition results click
    handleGetRekognitionLabelsClick = (jobID) => {
        this.getRekognitionLabels(jobID);
    }

    // Start Rekognition object detection
    handleStartRekognitionClick = (fileKey) => {
        
        let fileExt = fileKey.split('.').pop();

        if (fileExt === "jpeg" || fileExt === "jpg" || fileExt === "png") {
            this.startImageRekognition(fileKey);
            
            this.setState({
                detectionSpinner: true
            });

        } else if (fileExt === "mp4") {
            this.startVideoRekognition(fileKey);
            
            this.setState({
                detectionSpinner: true
            });

        } else {
            console.log('Format not supported for Object Detection');
        }
    }

    handleGetRekognitionResults = (jobID) => {
        var doStuff = () => {
            if (this.state.detectionStatus) {
                return this.getRekognitionLabels(jobID);
            }    
            
            this.checkRekognitionStatus(jobID); 
        };
        setInterval(doStuff, 5000);
    }

    handleDeleteClick = (fileKey) => {
        this.deleteMedia(fileKey);
        this.setState({
            uploadStatus: [],
            showMedia: false
        })
        
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
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb name={this.props.mediaInfo.match.params.id}></Breadcrumb>
                                </div>
                            </div>
                            
                            {/* Media Area */}
                                <Media 
                                    fileName={this.props.mediaInfo.match.params.id} 
                                    mediaSrc={this.props.mediaInfo.match.params.id} 
                                    delete={this.handleDeleteClick} 
                                    start={this.handleStartRekognitionClick} 
                                    spinner={this.state.detectionSpinner}
                                    detectComplete={this.state.detectionStatus}
                                    download={this.state.downloadLink}
                                    labelCount={this.state.labelCounter}
                                    showLabels={this.handleShowLabelsClick} 
                                /> 
                            
                            { this.state.showLabels ?
                            <Dataview
                                jobID={this.state.jobID}
                                click={this.handleGetRekognitionLabelsClick}
                                results={this.state.labelResults}
                                spinner={this.state.detectionSpinner}
                                download={this.state.downloadLink}
                                showLink={this.state.showDownload}
                            /> : null }
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

export default ObjectDetect;
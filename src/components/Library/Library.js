import React, { Component } from 'react';

import LibraryItem from './LibraryItem';
import Loader from '../../assets/img/loader.gif';

// Dependencies

// AWS SDK
var AWS = require('aws-sdk');

// AWS Credentials
AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region:'us-east-1'
});

class Library extends Component {
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

    handleDeleteClick = (fileKey) => {
        this.deleteMedia(fileKey);          
    }

    componentDidMount() {
        if (this.props.refresh) {
            this.listMedia();
        } else {
            this.listMedia();
        }
        
    }

    render() {
        return(
            <div>
                <div className="row p-3">
                    {this.state.s3Objects.length > 0 ? 
                    this.state.s3Objects.map((item, key) =>
                        <LibraryItem key={item.Key} mediaName={item.Key} mediaUrl={item.Key} deleteButton={this.handleDeleteClick}></LibraryItem>
                    ) 
                    : <div className="pl-3"><img className="pr-2 align-middle" src={Loader} height="20px" alt="Loading..." /> <span className="text-muted">Loading Media</span></div> } 
                </div>
            </div>
        ) 
    }

}

export default Library;
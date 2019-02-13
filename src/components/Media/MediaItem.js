import React, { Component } from 'react';

import Mediaplayer from '../Mediaplayer/Mediaplayer'
import Loader from '../../assets/img/loader.gif';

// Media Item
class Item extends Component {

    render() {
        // Load media player if video
        let fileExt = this.props.mediaSrc.split('.').pop();
        let mediaPlayer;

        if (fileExt === "mp4") {
            mediaPlayer = <Mediaplayer src={'https://s3.amazonaws.com/' + process.env.REACT_APP_BUCKET + '/' + this.props.mediaSrc} />;
        } else {
            mediaPlayer = <img src={'https://s3.amazonaws.com/' + process.env.REACT_APP_BUCKET + '/' + this.props.mediaSrc} className="card-img-item gallery-item-media rounded" alt="..." />;
        }
   
        return(
            <div className="row py-3">
    
                {/* Item */}
                <div className="col-8">
                    {mediaPlayer}
                </div>
    
                {/* Stats */}
                <div className="col-4 text-left">
                    <h5 className="asset-title"><i className="far fa-file pr-2"></i>AssetID</h5>
                    <p className="asset-id">{this.props.fileName}</p>
                    <hr/>
                    <div>
                        {/* Start Rekognition */}
                        {this.props.spinner ?
                            // Render Spinner Button
                            <div>
                                <button className="btn btn-gallery d-block mb-2" title="Object Detection">
                                    <img className="pr-2 align-middle" src={Loader} height="18px" alt="Running Detection" />Object Detection <span className="badge badge-success">RUNNING</span>
                                </button>
                                <div className="detection-message ml-2 d-block pb-3">This may take awhile. Please don't refresh your browser.</div>
                            </div> 
                        : 
                            // Render Normal Button
                            <div>
                                 <button className="btn btn-gallery d-block" onClick={() => this.props.start(this.props.fileName)} onMouseDown={e => e.preventDefault()} title="Start">
                                    <i className="far fa-image pr-2"></i>Object Detection {this.props.detectComplete ? <span className="badge badge-pill badge-success ml-1 align-text-top">{this.props.labelCount}</span> : null}
                                </button>
                                {this.props.detectComplete ?
                                    <div className="ml-2 pb-3 text-muted">
                                        <button type="button" className="btn btn-link d-block text-left pl-0 detection-results-btn" onClick={this.props.showLabels}><i className="fas fa-list pr-2"></i>View Results</button>
                                        <a className="btn btn-link d-block text-left pt-0 pl-0 detection-results-btn" href={this.props.download} download="data.json"><i className="fas fa-file-download pr-2"></i> Download JSON</a>
                                    </div>  
                                : null} 
                            </div>
                            
                        }

                        {/* Delete Media */}
                        <button className="btn btn-gallery d-block" onClick={() => this.props.delete(this.props.fileName)} title="Delete">
                            <i className="far fa-trash-alt pr-2"></i>Delete File
                        </button>  
                    </div>
                </div>
    
            </div>
        )
    }
}

export default Item;
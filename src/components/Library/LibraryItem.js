import React from 'react';

const libraryItem = (props) => {

  // Format media src url
  let srcURL = 'https://s3.amazonaws.com/' + process.env.REACT_APP_BUCKET + '/' + props.mediaUrl;

  // Load media player if video
  let fileExt = props.mediaUrl.split('.').pop();
  let mediaPlayer;

  if (fileExt === "mp4") {
    mediaPlayer = <video className="card-img-top gallery-item-media rounded" controls><source src={srcURL} type="video/mp4" /></video>;
  } else {
    mediaPlayer = <img src={srcURL} className="card-img-top gallery-img" alt={props.mediaName} title={props.mediaName} />;
  }

  return (
    // Media Card
    <div className="col-3">
      <div className="card media-card">
        {mediaPlayer}
        <div className="card-body">
          <div className="row pb-3">
            <div className="col-12">
              <p className="card-text text-left" title={props.mediaName}>
                <i className="far fa-file pr-2"></i>{ props.mediaName.length > 25 ? props.mediaName.substring(0, 25) + '...' : props.mediaName}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-7 text-muted">
              {/* <img className="pr-2 align-middle" src={Loader} height="18px" />Running...   */}
            </div>
            <div className="col-5 text-right">

              <a href={'/media/' + props.mediaName} className="btn btn-gallery" alt="Object Detection" title="Object Detection">
                <i className="far fa-image"></i>
              </a>

              <button className="btn btn-gallery" onClick={() => props.deleteButton(props.mediaName)} alt="Delete Media" title="Delete Media">
                <i className="far fa-trash-alt"></i>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default libraryItem;
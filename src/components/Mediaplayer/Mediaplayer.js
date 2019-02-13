import React from 'react';

// Mediaplayer
const mediaPlayer = (props) => {
    return(
        <video className="card-img-item gallery-item-media rounded" controls>
            <source src={props.src} type="video/mp4" />
        </video>
    )
}

export default mediaPlayer;
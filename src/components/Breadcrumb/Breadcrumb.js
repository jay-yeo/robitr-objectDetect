import React from 'react';

// Breadcrumb
const breadcrumb = (props) => {
    return(
        // Breadcrumb
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a href="/">Object Detection</a>
            </li>
            <li className="breadcrumb-item active">
                {props.name}
            </li>
        </ol>
    )
}

export default breadcrumb;
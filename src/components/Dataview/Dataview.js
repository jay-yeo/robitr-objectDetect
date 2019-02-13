import React from 'react';

var prettifyJSON = require('prettify-json');

// Dataview
const Dataview = (props) => {
    return (
        <div className="row py-3 text-left">
            <div className="col-12">
                <h4>Label Detection</h4>
            </div>
            <div className="col-12 pt-3">
                <pre>{prettifyJSON(props.results)}</pre>
            </div>
        </div>
    )
}

export default Dataview;
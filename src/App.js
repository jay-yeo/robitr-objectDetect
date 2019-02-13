// Robitr - Object Detection UI v1.0.0 (http://robitr.co)

import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';


// Style
import './assets/css/Style.css';

// Pages
import Gallery from './containers/Gallery';
import Settings from './containers/Settings';
import Upload from './containers/Upload';
import Dashboard from './containers/Dashboard';
import ObjectDetect from './containers/ObjectDetect';


class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <div>
          
          {/* Home */}
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Dashboard />
            </div>
          )}/>

          {/* Object Detection */}
          <Route exact={true} path='/media/:id' render={(match) => (
            <div className="App">
              <ObjectDetect mediaInfo={match} />
            </div>
          )}/>

          {/* Gallery */}
          <Route exact={true} path='/gallery' render={() => (
            <div className="App">
              <Gallery />
            </div>
          )}/>

          {/* Settings */}
          <Route exact={true} path='/settings' render={() => (
            <div className="App">
              <Settings />
            </div>
          )}/>

          {/* Upload */}
          <Route exact={true} path='/upload' render={() => (
            <div className="App">
              <Upload />
            </div>
          )}/>
          
        </div>
      </BrowserRouter>

    );
  }
}

export default App;

import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: ''
});

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input});
    {
      /*
      make sure to install clarifai using command below:
      ///////////////////////////////////////////////////////////////////////////////
      // Installation
      ///////////////////////////////////////////////////////////////////////////////

      npm install clarifai

      // You can also use the SDK by adding this script to your HTML:
      <script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>


      ///////////////////////////////////////////////////////////////////////////////
      // Initialize client
      ///////////////////////////////////////////////////////////////////////////////
      const Clarifai = require('clarifai');

      const app = new Clarifai.App({
       apiKey: 'YOUR_API_KEY'
      });
      */
    }
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={ this.onInputChange }
                       onButtonSubmit={ this.onButtonSubmit }/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  setFaceBox = (box) => {
    this.setState({box: box});
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

      https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
      */
    }
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.input)
    .then(response => this.setFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})

    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, box} = this.state;

    return (
      <div className="App">
        <Particles className='particles'/>

        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={isSignedIn}/>
        {
          this.state.route === 'home'
           ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={ this.onInputChange }
                             onButtonSubmit={ this.onButtonSubmit }/>
              <FaceRecognition imageUrl={imageUrl} faceBox={box}/>
             </div>
          : (
              this.state.route === 'register'
               ? <Register onRouteChange={ this.onRouteChange } />
               : <Signin onRouteChange={ this.onRouteChange } />
            )
        }
      </div>
    );
  }
}

export default App;

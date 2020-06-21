import React from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

function App() {
  return (
    <div className="App">
      <Particles className='particles'/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {
        /*
        <FaceRecognition />
        */
      }
    </div>
  );
}

export default App;

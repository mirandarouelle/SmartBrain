import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma pa3'>
      <div classname='absolute mt2'>
        <img src={imageUrl} alt='' width='500px' height='auto'/>
      </div>
    </div>
  );
}

export default FaceRecognition;

import React from 'react'

export default function HowTo({setShowHowTo, solution}) {
  const handleOKButton = () => {
    setShowHowTo(false);
  };

  return (
    <div className='panel'>
      <div>
        <h1>How to Play?</h1>
        <img src='/how-to-work.jpg' width="480" height={500} alt='how to play'/>
        <br/>
        <button type="button" onClick={handleOKButton}>OK</button>
        <p className='light'>{'build: 20220619'} {solution}</p>
      </div>
    </div>
  );
}

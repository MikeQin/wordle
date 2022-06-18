import React from 'react'

const Message = ({currentGuess, setCorrectWord}) => {

  const handleOKButton = (event) => {
    setCorrectWord(true);
  };

  return (
    <div className='modal'>
     
        <div>
          <h1>Not an English Word</h1>
          <p className='solution'>{currentGuess}</p>
          <p>Please enter a valid English word.</p>
          <br/>
          <button type="button" className='button' onClick={handleOKButton}>OK</button>
        </div>
    </div>
  );
}
 
export default Message;
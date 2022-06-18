import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {

  const handleOKButton = (event) => {
    window.location.reload();
  };
  
  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1>You Won!</h1>
          <p className='solution'>{solution}</p>
          <p>Great! You found the solution in {turn} guesses :)</p>
          <br/>
          <button type="button" onClick={handleOKButton}>OK</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lost!</h1>
          <p><span className='solution'>{solution}</span></p>
          <p>You guessed {turn} times. Better luck next time :)</p>
          <br/>
          <button type="button" onClick={handleOKButton}>OK</button>
        </div>
      )}
    </div>
  )
}

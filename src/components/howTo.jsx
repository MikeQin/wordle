import React from 'react'

export default function HowTo({setShowHowTo, solution}) {
  const handleOKButton = () => {
    setShowHowTo(false);
  };

  return (
    <div className='panel'>
      <div>
        <h1 style={{textAlign: "center"}}>How to Play?</h1>
        <p>Wordle is such a simple game that there are hardly any rules. But here you go:</p>
        <ul>
          <li>You have to guess the Wordle in six goes or less</li>
          <li>Every word you enter must be in the word list. There are more than 10,000 words in this list, 
            but only 2,309 (at the time of writing) are answers to a specific puzzle</li>
          <li>A correct letter turns green</li>
          <li>A correct letter in the wrong place turns yellow</li>
          <li>An incorrect letter turns gray</li>
          <li>Letters can be used more than once</li>
          <li>Answers are never plurals</li>
        </ul>
        <p style={{textAlign: "center"}}><button type="button" onClick={handleOKButton}>OK</button></p>
        <p className='light'>{'build: 20220619'} {solution}</p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './grid';
import HowTo from './howTo';
import Keypad from './keypad';
import Message from './message';
import Result from './result';

export default function Wordle({ solution }) {

  const { currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyupOrClick, 
          correctWord, setCorrectWord } = useWordle(solution);
  const [showResult, setShowResult] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyupOrClick);

    if (isCorrect) {
      setTimeout(() => setShowResult(true), 2000);
      window.removeEventListener("keyup", handleKeyupOrClick);
    }

    if (turn > 5) {
      setTimeout(() => setShowResult(true), 2000);
      window.removeEventListener("keyup", handleKeyupOrClick);
    }

    return () => window.removeEventListener("keyup", handleKeyupOrClick);

  }, [handleKeyupOrClick, isCorrect, turn, setShowResult]);

  // useEffect(() => {
  //   console.log("cheat: " + solution);
  // }, [solution]);

  const handleHowToPlay = () => {
    setShowHowTo(true);
  };

  return (
    <>
    {/* debugging: <div>Solution - {solution}</div>
    <div>Current Guess - { currentGuess }</div> */}
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    <Keypad usedKeys={usedKeys} handleKeyupOrClick={handleKeyupOrClick}/>
    <br/>
    <button type="button" onClick={handleHowToPlay}>How to play?</button>
    {showResult && <Result isCorrect={isCorrect} turn={turn} solution={solution} />}
    {!correctWord && <Message currentGuess={currentGuess} setCorrectWord={setCorrectWord}/>}
    {showHowTo && <HowTo setShowHowTo={setShowHowTo} solution={solution}/>}
    </>
  )
}

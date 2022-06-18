import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './grid';
import Keypad from './keypad';
import Modal from './modal';

export default function Wordle({ solution }) {

  const { currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyupOrClick } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyupOrClick);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyupOrClick);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyupOrClick);
    }

    return () => window.removeEventListener("keyup", handleKeyupOrClick);

  }, [handleKeyupOrClick, isCorrect, turn]);

  useEffect(() => {
    console.log("cheat: " + solution);
  }, [solution]);

  return (
    <>
    {/* <div>Solution - {solution}</div>
    <div>Current Guess - { currentGuess }</div> */}
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
    <Keypad usedKeys={usedKeys} handleKeyupOrClick={handleKeyupOrClick}/>
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </>
  )
}

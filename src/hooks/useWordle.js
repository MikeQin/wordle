import { useState } from 'react';
import Dictionary from '../data/dictionary';

const useWordle = (solution) => {

  const [turn, setTurn] = useState(0) // 0 
  const [currentGuess, setCurrentGuess] = useState('') // ''
  const [guesses, setGuesses] = useState([...Array(6)]) // [...Array(6)], each guess is an array, 6 rows
  const [history, setHistory] = useState([]) // [], each guess is a string
  const [isCorrect, setIsCorrect] = useState(false) // false,
  const [usedKeys, setUsedKeys] = useState({}) // {}, {a: 'green', b: 'yellow', c: 'gray'}
  const [correctWord, setCorrectWord] = useState(true); // true, 

  // format a guess into an array of letter objects
  // [{key:'a', color:'yellow'}]
  const formatGuess = () => {
    let solutionLetters = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return {key: letter, color: 'gray'};
    });

    // find any green letter
    formattedGuess.forEach((letter, i) => {
      if (solutionLetters[i] === letter.key) {
        formattedGuess[i].color = 'green';
        solutionLetters[i] = null;
      }
    });

    // find any yellow letter
    formattedGuess.forEach((letter, i) => {
      if (solutionLetters.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionLetters[solutionLetters.indexOf(letter.key)] = null;
      }
    });
    
    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
   
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
   
    const found = Dictionary.indexOf(currentGuess);
    if (found === -1) {
      setCorrectWord(false);
      console.log("[" + currentGuess + "] is not a correct English word.");
      return
    }

    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prev) => {
      return [...prev, currentGuess];
    });

    setTurn((prev) => {
      return prev + 1;
    });

    // color the keypad
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys};

      formattedGuess.forEach((v) => {
        const currentColor = newKeys[v.key];

        if (v.color === 'green') {
          newKeys[v.key] = 'green';
          return;
        }
        else if (v.color === 'yellow' && currentColor !== 'green') {
          newKeys[v.key] = 'yellow';
          return;
        }
        else if (v.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[v.key] = 'gray';
          return;
        }
      })

      return newKeys;
    });

    setCurrentGuess('');
  };
  
  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyupOrClick = (event) => {
    const { type } = event;
    let key = null;
    if (type === 'keyup') {
      key = event.key;
    }
    else if (type === 'click') {
      key = event.target.innerText;
    }

    //console.log("key:", key);
    
    //const { key } = event;
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        return;
      }

      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });

      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, 
    handleKeyupOrClick, correctWord, setCorrectWord };
};
 
export default useWordle;
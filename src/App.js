import { useEffect, useState } from 'react';
import './App.css';
import Wordle from './components/wordle';
import WordBank from './data/words';

function App() {
  const [solution, setSolution] = useState('');

  useEffect(()=> {

    const selected = WordBank[Math.floor(Math.random()*WordBank.length)];
    setSolution(selected);

    // fetch("http://localhost:3001/solutions")
    //   .then(res => res.json())
    //   .then(json => {
    //     const randSolution = json[Math.floor(Math.random()*json.length)];
    //     setSolution(randSolution.word);
    //   });

  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle Game</h1>
      { solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import './App.css';

const BOARD = [['h', 'i', 's'],['s', 'h', 'e'],['t', 'e', 'a']];

function App() {

  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);

  // useEffect will trigger when the array items in the second argument are
  // updated. The array is empty, so this will run only when component is
  // initalized. We should only recompute all solutions if the board changes.
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(BOARD, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, []);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <Board board={BOARD}/>
      <GuessInput allSolutions={allSolutions}
                  foundSolutions={foundSolutions} 
                  correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
      <FoundSolutions words={foundSolutions} />
    </div>
  );
}

export default App;

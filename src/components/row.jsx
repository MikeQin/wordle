import React from 'react'

export default function Row({guess, currentGuess}) {

  if (guess) {
    return (
      <div className='row past'>
        {guess.map((l, i) => (
          <div id={i} key={i} className={l.color}>{l.key}</div>
        ))}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split('');
    return (
      <div className='row current'>
        {letters.map((letter, i) =>(
          <div id={i} key={i} className="filled" >{letter}</div>
        ))}

        {/* create empty boxes below */}
        {[...Array(5-letters.length)].map((v, i) => (
          <div id={i} key={i}></div>
        ))}
      </div>
    )
  }

  return (
    <div className='row'>
      {/* {columns} */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

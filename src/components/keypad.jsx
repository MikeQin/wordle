import React, { Fragment, useEffect, useState } from 'react';
import Keys from '../data/keys';

export default function Keypad( { usedKeys, handleKeyupOrClick }) {
  const [letters, setLetters] = useState(null);

  const wideStyle = {
    margin: '5px',
    width: '120px',
    height: '50px',
    background: '#eee',
    display: 'inline-block',
    borderRadius: '6px',
    lineHeight: '50px'
  };

  useEffect(() => {
    setLetters(Keys);
    // fetch('http://localhost:3001/letters')
    // .then(res => res.json())
    // .then(json => {
    //   setLetters(json);
    // })
  }, [setLetters]);

  return (
    <div id='keypad' className='keypad'>
      {letters && letters.map((v, i) => {
        const color = usedKeys[v.key];
        if (v.key === 'a') {
          return (
            <Fragment key="f1">
            <br />
            <div id={v.key} key={v.key} className={color} onClick={handleKeyupOrClick}>{v.key}</div>
            </Fragment>
          )
        } else if (v.key === 'z') {
          return (
            <Fragment key="f2">
            <br />
            <div id={v.key} key={v.key} className={color} onClick={handleKeyupOrClick}>{v.key}</div>
            </Fragment>
          )
        } else {
          return (
            <div id={v.key} key={v.key} className={color} onClick={handleKeyupOrClick}>{v.key}</div>
          )
        }
      })}
    <br />
    <div id='Backspace' style={wideStyle} onClick={handleKeyupOrClick}>Backspace</div>
    <div id='Enter' style={wideStyle} onClick={handleKeyupOrClick}>Enter</div>
  </div>
  )
}

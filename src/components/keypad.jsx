import React, { Fragment, useEffect, useState } from 'react';
import Keys from '../data/keys';

const wideStyle = {
  margin: '5px',
  width: '120px',
  height: '50px',
  background: '#eee',
  display: 'inline-block',
  borderRadius: '6px',
  lineHeight: '50px'
};

export default function Keypad( { usedKeys, handleKeyupOrClick }) {
  const [letters, setLetters] = useState(null);

  /* BEGIN: Detect Mobile or Browser client */
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [setWidth]);
  const isMobile = width <= 768;
  /* END: Detect Mobile or Browser client */
  //console.log("isMobile:", isMobile);

  useEffect(() => {
    setLetters(Keys);
    // Below for json-server code
    // --------------------------
    // fetch('http://localhost:3001/letters')
    // .then(res => res.json())
    // .then(json => {
    //   setLetters(json);
    // })
  }, [setLetters]);

  return (
    <>
    <div id='keypad' className='keypad'>
      {letters && letters.map((v, i) => {
        const color = usedKeys[v.key];
        if (isMobile) { // Mobile client logic
          //console.log("Mobile client...");
          return (
            <div id={v.key} key={v.key} className={color} onClick={handleKeyupOrClick}>{v.key}</div>
          )
        } else { // Browser client logic
          //console.log("Browser client...");
          if (v.key === 'a') { // start the 2nd line on keypad for windows client
            return (
              <Fragment key="f1">
              <br />
              <div id={v.key} key={v.key} className={color} onClick={handleKeyupOrClick}>{v.key}</div>
              </Fragment>
            )
          } else if (v.key === 'z') { // start the 3rd line on keypad
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
        }
      })}
    <br />
    <div id='Backspace' style={wideStyle} onClick={handleKeyupOrClick}>Backspace</div>
    <div id='Enter' style={wideStyle} onClick={handleKeyupOrClick}>Enter</div>
  </div>
  <br/>
  <div className='msg'>{isMobile ? 'Mobile Client. ' : 'Browser Client. '} {'Copyright '} &copy; {' 2022 TechSoft'}</div>
  </>
  )
}

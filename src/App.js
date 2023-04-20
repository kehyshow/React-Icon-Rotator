import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [rotateDirection, setRotateDirection] = useState(1);
  const [iconSize, setIconSize] = useState(100);
  const [showSidebar, setShowSidebar] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stillTime, setStillTime] = useState(0);
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(0);
  const [switchOff, setSwitchOff] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStillTime = () => {
      if (lastMouseMoveTime !== 0 && Date.now() - lastMouseMoveTime > 1000) {
        setStillTime((stillTime) => stillTime + 1);
      } else {
        setStillTime(0);
      }
    };

    const interval = setInterval(handleStillTime, 1000);

    return () => clearInterval(interval);
  }, [lastMouseMoveTime]);

  const handleClick = useCallback(() => {
    setRotateDirection((rotateDirection) => !rotateDirection);
  }, []);

  const handleMouseMove = useCallback((event) => {
    const x = event.clientX;
    const y = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const diagonal = Math.sqrt(windowWidth * windowWidth + windowHeight * windowHeight);

    setIconSize((x + y) / diagonal * 200);
    setLastMouseMoveTime(Date.now());
  }, []);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((showSidebar) => !showSidebar);
  }, []);

  const handleSwitchOff = useCallback(() => {
    setSwitchOff((switchOff) => !switchOff);
  }, []);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {showSidebar && (
        <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Side Bar</h3>
            <button onClick={handleSwitchOff}>
              {switchOff ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      )}

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {showSidebar ? '<' : '>'}
      </button>

      <div className="App-header">
        {!switchOff && (
          <div onClick={handleClick}>
            <img
              src={logo}
              alt="logo"
              className="App-logo"
              style={{
                animation: `${
                  rotateDirection
                    ? 'App-logo-spin-clockwise'
                    : 'App-logo-spin-anti-clockwise'
                } infinite 20s linear`,
                width: `${iconSize}px`,
                height: `${iconSize}px`
              }}
            />
          </div>
        )}
        {switchOff ? (
          <div>
            <img src={logo} alt="logo" className="App-logo" />
            <p>Edit &lt;code&gt;src/App.js&lt;/code&gt; and save to reload.</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Learn React
            </a>
          </div>
        ) : (
          <div>
            <div>
              <p>Elapsed Time: {elapsedTime} seconds</p>
              <p>Still Time: {stillTime} seconds</p>
            </div>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
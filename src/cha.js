import React from 'react';
import './cha.css';

function BoxWindow() {
  const handleStartClick = () => {
    alert("Start button clicked!");
    // Add any action you want to perform on button click here
  };

  return (
    <div className="boxWindow">
      <div className="boxContent">
        <p>Press start to begin.</p>
      </div>
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BoxWindow />
      </header>
    </div>
  );
}

export default App;

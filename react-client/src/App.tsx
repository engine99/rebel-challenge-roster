import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header shrink-header">
        <div className="icon-box"> 
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            Artist roster
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

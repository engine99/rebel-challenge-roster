import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header shrink-header">
          <div className="headline">
            Artist roster
          </div>
        <div className="logo-box">
          <img src={logo} className="App-logo shrink-logo" alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default App;

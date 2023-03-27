import React from 'react';
import logo from './logo.svg';
import './Header.css';

function Header() {
  return (
      <header className="App-header shrink-header">
        <div className="headline">
          Artist Roster
        </div>
        <div className="logo-box">
          <img src={logo} className="App-logo shrink-logo" alt="logo" />
        </div>
      </header>
  );
}

export default Header;

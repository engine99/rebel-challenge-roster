import React from 'react';
import logo from './logo.svg';
import './Header.css';

/* Cannot seem to get drag-and-drop working. Can't get dragStart to fire. Maybe interference from react? Try later with ReactDnD*/
// const loadData = (e: React.DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   console.log(e.dataTransfer.getData('application/json'))
// }

// const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
//   e.dataTransfer.setData('application/json', "{data:data}")
// }

// const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
// }

function Header() {
  return (
      <header className="App-header shrink-header">
        <div className="headline">
          Artist Roster
        </div>
        <div className="logo-box"
          // onDragOver={dragOver}
          // onDragStart={handleDragStart}
          // onDrop={loadData}
          // draggable='true'
          >
          <img src={logo} className="App-logo shrink-logo" alt="logo" />
        </div>
      </header>
  );
}

export default Header;

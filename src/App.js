import React from 'react';
import Routes from './routes';

import './App.css';

// https://www.npmjs.com/package/qrcode.react
// https://www.npmjs.com/package/react-html5-camera-photo

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiMessage, setApiMessage] = useState();
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchApiMessage = useCallback(async () => {
    const response = await fetch('/api/message');
    const { message } = await response.json();
    setApiMessage(message);
  }, []);

  useEffect(() => {
    if (!hasInitialized) {
      fetchApiMessage();
      setHasInitialized(true);
    }
  }, [hasInitialized, fetchApiMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!!apiMessage && <p>{apiMessage}</p>}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [urlInput, setUrlInput] = useState('');
  const [history, setHistory] = useState([]); // { url, timestamp }
  const [maxHistory, setMaxHistory] = useState(5);

  const visitPage = () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) return;

    const now = new Date();
    // Remove duplicates
    const filteredHistory = history.filter(entry => entry.url !== trimmedUrl);
    const updatedHistory = [{ url: trimmedUrl, timestamp: now }, ...filteredHistory];

    // Limit to maxHistory
    setHistory(updatedHistory.slice(0, maxHistory));
    setUrlInput('');
  };

  const getMostRecentHistory = () => {
    return history.slice(0, maxHistory);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="container">
      <h2>Browser History Simulator</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter URL"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
        />
        <button onClick={visitPage}>Visit Page</button>
        <br />

        <input
          type="number"
          min="1"
          value={maxHistory}
          onChange={e => setMaxHistory(Number(e.target.value))}
        />

        <button onClick={clearHistory}>Clear History</button>
      </div>

      <h3>Recent History (Top {maxHistory})</h3>
      <ul>
        {getMostRecentHistory().map((entry, index) => (
          <li key={index}>
            <strong>{entry.url}</strong><br />
            <small>Visited at: {entry.timestamp.toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

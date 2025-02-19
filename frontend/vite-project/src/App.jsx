// src/App.jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memeow Maker</h1>
        <p>
          Welcome to Memeow Maker, the ultimate web app for creating customized cat memes!
        </p>
        <p>
          Upload your own cat photos or choose from our gallery of funny cat images. 
          Our app auto-generates humorous captions and quirky life advice, and you can 
          customize the text to make it your own.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>Upload Your Own Cat Photos or Choose from a Gallery</li>
          <li>Random Captions & Life Advice</li>
          <li>Editable Text</li>
          <li>Voting System: Purr (Upvote) & Hiss (Downvote)</li>
          <li>Download & Share Memes</li>
          <li>Responsive Design for All Devices</li>
        </ul>
        <p>
          Join us in creating hilarious cat memes that you can share with your friends!
        </p>
      </header>
    </div>
  );
}

export default App;
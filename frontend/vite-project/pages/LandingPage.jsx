import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"));
  
  // Cat images for the gallery
  const catImages = [
    "https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg",
    "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
    "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg"
  ];
  
  // Handle audio play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <div className="landing-container fade-in">
      <div className="landing-header">
        <h1>Welcome to Memeow Maker <span role="img" aria-label="cat emoji">😸</span></h1>
        <button className="audio-button" onClick={toggleAudio}>
          {isPlaying ? "Pause Meow" : "Play Meow"} 🔊
        </button>
      </div>
      
      <div className="landing-intro">
        <p>
          <strong>Memeow Maker</strong> is a fun web app that lets you create hilarious cat memes! 
          Upload your own cat photos or choose from a gallery of funny cat images.
          The app generates quirky captions and life advice like:
          <em>"Don't let your human tell you when to nap!"</em>
        </p>
      </div>
      
      <div className="cat-gallery">
        {catImages.map((image, index) => (
          <div key={index} className="cat-image-container">
            <img src={image} alt={`Cat ${index + 1}`} className="cat-image" />
          </div>
        ))}
      </div>
      
      <div className="feature-list">
        <h2>Key Features:</h2>
        <div className="feature-item">
          <span className="feature-icon">🐱</span>
          <div>
            <strong>Upload Your Own Cat Photos or Pick from a Gallery</strong>
            <p>Choose from your cat collection or a fun preloaded gallery.</p>
          </div>
        </div>
        
        <div className="feature-item">
          <span className="feature-icon">🐾</span>
          <div>
            <strong>Random Captions & Life Advice</strong>
            <p>Auto-generate funny, random captions and life advice.</p>
          </div>
        </div>
        
        <div className="feature-item">
          <span className="feature-icon">✏️</span>
          <div>
            <strong>Editable Text</strong>
            <p>Customize font, size, and text placement.</p>
          </div>
        </div>
        
        <div className="feature-item">
          <span className="feature-icon">👍</span>
          <div>
            <strong>Voting System</strong>
            <p>Rate memes with:</p>
            <ul>
              <li><strong>Purr (Upvote)</strong> – For memes you love.</li>
              <li><strong>Hiss (Downvote)</strong> – For memes that need improvement.</li>
            </ul>
          </div>
        </div>
        
        <div className="feature-item">
          <span className="feature-icon">📲</span>
          <div>
            <strong>Download & Share</strong>
            <p>Save your meme or share it directly on social media!</p>
          </div>
        </div>
      </div>
      
      <div className="tech-stack">
        <h2>Tech Stack:</h2>
        <ul>
          <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript (React)</li>
          <li><strong>Backend:</strong> Node.js with Express</li>
          <li><strong>APIs:</strong> TheCatAPI for images + Random Advice API</li>
          <li><strong>Deployment:</strong> Frontend on Netlify/Vercel, Backend on Heroku/DigitalOcean</li>
        </ul>
      </div>
      
      <div className="cta-container">
        <p className="cta-text">🚀 Create, laugh, and share – your perfect meme is just a click away!</p>
        <button 
          className="cta-button"
          onClick={() => window.open("https://s63-memeow-maker.onrender.com", "_blank")}
        >
          Create Your Own Meme!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

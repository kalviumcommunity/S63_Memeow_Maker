// src/components/MemeCard.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MemeCard = ({ meme }) => {
  const [votes, setVotes] = useState(meme.votes);
  const [isVoting, setIsVoting] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [audio] = useState({
    purr: new Audio('https://assets.mixkit.co/active_storage/sfx/2938/2938-preview.mp3'),
    hiss: new Audio('https://assets.mixkit.co/active_storage/sfx/2121/2121-preview.mp3')
  });

  // Handle voting with sound effects
  const handleVote = (type) => {
    setIsVoting(true);
    
    // Play sound effect
    setPlaySound(type);
    
    // Update votes
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type === 'purr' ? 'purrs' : 'hisses']: prevVotes[type === 'purr' ? 'purrs' : 'hisses'] + 1,
    }));
    
    // Reset voting state after animation
    setTimeout(() => {
      setIsVoting(false);
      setPlaySound(false);
    }, 1000);
  };
  
  // Play sound effects
  useEffect(() => {
    if (playSound === 'purr') {
      audio.purr.currentTime = 0;
      audio.purr.play();
    } else if (playSound === 'hiss') {
      audio.hiss.currentTime = 0;
      audio.hiss.play();
    }
    
    // Cleanup function
    return () => {
      audio.purr.pause();
      audio.hiss.pause();
    };
  }, [playSound, audio]);

  return (
    <div className={`meme-card ${isVoting ? 'shake' : ''}`}>
      <div className="meme-image-container">
        <img 
          src={meme.imageUrl} 
          alt={meme.caption} 
          className="meme-image"
        />
        <div className="meme-caption-overlay">
          <h3 className="meme-caption">{meme.caption}</h3>
          <p className="meme-custom-text">{meme.customText}</p>
        </div>
      </div>
      
      <div className="meme-votes">
        <div className="vote-count">
          <span role="img" aria-label="purr">😻</span> {votes.purrs}
        </div>
        <div className="vote-count">
          <span role="img" aria-label="hiss">🙀</span> {votes.hisses}
        </div>
      </div>
      
      <div className="meme-buttons">
        <button 
          onClick={() => handleVote('purr')} 
          className="purr-button"
          disabled={isVoting}
        >
          Purr <span role="img" aria-label="purr">😻</span>
        </button>
        <button 
          onClick={() => handleVote('hiss')} 
          className="hiss-button"
          disabled={isVoting}
        >
          Hiss <span role="img" aria-label="hiss">🙀</span>
        </button>
      </div>
    </div>
  );
};

// PropTypes for type checking
MemeCard.propTypes = {
  meme: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    customText: PropTypes.string.isRequired,
    votes: PropTypes.shape({
      purrs: PropTypes.number.isRequired,
      hisses: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

// Dummy data for the meme (for demonstration purposes)
export const dummyMeme = {
  imageUrl: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg',
  caption: "Don't let your human tell you when to nap.",
  customText: 'Just do it!',
  votes: {
    purrs: 10,
    hisses: 2,
  },
};

// Export the MemeCard component
export default MemeCard;
// src/components/MemeCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MemeCard = ({ meme }) => {
  const [votes, setVotes] = useState(meme.votes);

  const handleUpvote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      purrs: prevVotes.purrs + 1,
    }));
  };

  const handleDownvote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      hisses: prevVotes.hisses + 1,
    }));
  };

  return (
    <div className="meme-card" style={styles.card}>
      <img src={meme.imageUrl} alt={meme.caption} style={styles.image} />
      <h3 style={styles.caption}>{meme.caption}</h3>
      <p style={styles.customText}>{meme.customText}</p>
      <div style={styles.votes}>
        <span>Purrs: {votes.purrs}</span>
        <span> | Hisses: {votes.hisses}</span>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleUpvote} style={styles.button}>Purr</button>
        <button onClick={handleDownvote} style={styles.button}>Hiss</button>
      </div>
    </div>
  );
};

// Dummy data for the meme
const dummyMeme = {
    imageUrl: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?cs=srgb&dl=pexels-pixabay-57416.jpg&fm=jpg', // Replace with a valid image URL
    caption: "Don't let your human tell you when to nap.",
    customText: 'Just do it!',
    votes: {
      purrs: 10,
      hisses: 2,
    },
  };

// Render the MemeCard component with dummy data
const App = () => {
  return (
    <div>
      
      <MemeCard meme={dummyMeme} />
    </div>
  );
};

// Styles for the MemeCard component
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(240, 0, 0, 0.97)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  caption: {
    fontSize: '2rem', // Increased font size
    margin: '8px 0',
    color: '#333', // Darker color for better contrast
    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)', // Added text shadow
  },
  customText: {
    fontSize: '1rem',
    color: '#555',
  },
  votes: {
    marginTop: '8px',
    fontSize: '1rem',
  },
  buttonContainer: {
    marginTop: '12px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    margin: '0 5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
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

export default App;
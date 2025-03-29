import React, { useState, useEffect } from 'react';

const Demo = () => {
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  
  // Audio URLs (would be replaced with imported audio files)
  const audioSources = {
    purr: 'https://assets.mixkit.co/active_storage/sfx/2938/2938-preview.mp3',
    meow: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
    hiss: 'https://assets.mixkit.co/active_storage/sfx/2121/2121-preview.mp3'
  };
  
  // Image URLs (would be replaced with imported image files)
  const catImages = [
    'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg',
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg',
    'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg',
    'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg'
  ];
  
  // Play audio function
  const playAudio = (soundName) => {
    // Stop any currently playing sound
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
    
    // Create and play new audio
    const audio = new Audio(audioSources[soundName]);
    audio.play();
    setCurrentSound(audio);
    setIsPlaying(true);
    
    // Reset playing state when audio ends
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentSound(null);
    };
  };
  
  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.pause();
      }
    };
  }, [currentSound]);
  
  return (
    <div className="demo-container slide-up">
      <h1>Memeow Maker Style Demo</h1>
      <p className="demo-intro">
        This page demonstrates the styling, animations, images, and audio elements
        added to the Memeow Maker application.
      </p>
      
      {/* Color Palette Section */}
      <section className="demo-section">
        <h2>Color Palette</h2>
        <div className="color-palette">
          <div className="color-swatch" style={{ backgroundColor: 'var(--primary-color)' }}>
            <span>Primary</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-color)' }}>
            <span>Secondary</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: 'var(--accent-color)' }}>
            <span>Accent</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: 'var(--dark-color)' }}>
            <span>Dark</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: 'var(--light-color)' }}>
            <span>Light</span>
          </div>
        </div>
      </section>
      
      {/* Typography Section */}
      <section className="demo-section">
        <h2>Typography</h2>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <p>Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p><strong>Bold text</strong> and <em>italic text</em> examples.</p>
      </section>
      
      {/* Buttons Section */}
      <section className="demo-section">
        <h2>Buttons</h2>
        <div className="button-showcase">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-accent">Accent Button</button>
          <button className="btn-success">Success Button</button>
          <button className="btn-danger">Danger Button</button>
        </div>
      </section>
      
      {/* Animations Section */}
      <section className="demo-section">
        <h2>Animations</h2>
        <div className="animation-showcase">
          <div className="animation-item">
            <div className="animation-demo shake">Shake</div>
            <p>Class: shake</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo fade-in">Fade In</div>
            <p>Class: fade-in</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo slide-up">Slide Up</div>
            <p>Class: slide-up</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo pulse">Pulse</div>
            <p>Class: pulse</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo bounce">Bounce</div>
            <p>Class: bounce</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo rotate">Rotate</div>
            <p>Class: rotate</p>
          </div>
          <div className="animation-item">
            <div className="animation-demo pop-in">Pop In</div>
            <p>Class: pop-in</p>
          </div>
        </div>
      </section>
      
      {/* Images Section */}
      <section className="demo-section">
        <h2>Cat Images</h2>
        <div className="image-gallery">
          {catImages.map((image, index) => (
            <div key={index} className="image-item hover-grow">
              <img src={image} alt={`Cat ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Audio Section */}
      <section className="demo-section">
        <h2>Cat Sounds</h2>
        <div className="audio-showcase">
          <button 
            className="audio-button purr-button"
            onClick={() => playAudio('purr')}
            disabled={isPlaying}
          >
            Play Purr Sound 😻
          </button>
          <button 
            className="audio-button"
            onClick={() => playAudio('meow')}
            disabled={isPlaying}
          >
            Play Meow Sound 🐱
          </button>
          <button 
            className="audio-button hiss-button"
            onClick={() => playAudio('hiss')}
            disabled={isPlaying}
          >
            Play Hiss Sound 🙀
          </button>
        </div>
        {isPlaying && <p>Playing sound... 🔊</p>}
      </section>
      
      {/* Cards Section */}
      <section className="demo-section">
        <h2>Cards</h2>
        <div className="card-showcase">
          <div className="card p-4">
            <h3>Basic Card</h3>
            <p>This is a simple card with some content.</p>
          </div>
          
          <div className="meme-card">
            <div className="meme-image-container">
              <img 
                src={catImages[0]} 
                alt="Cat meme" 
                className="meme-image"
              />
              <div className="meme-caption-overlay">
                <h3 className="meme-caption">Don't let your human tell you when to nap.</h3>
                <p className="meme-custom-text">Just do it!</p>
              </div>
            </div>
            
            <div className="meme-votes">
              <div className="vote-count">
                <span role="img" aria-label="purr">😻</span> 10
              </div>
              <div className="vote-count">
                <span role="img" aria-label="hiss">🙀</span> 2
              </div>
            </div>
            
            <div className="meme-buttons">
              <button className="purr-button">
                Purr <span role="img" aria-label="purr">😻</span>
              </button>
              <button className="hiss-button">
                Hiss <span role="img" aria-label="hiss">🙀</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Utility Classes Section */}
      <section className="demo-section">
        <h2>Utility Classes</h2>
        <div className="utility-showcase">
          <div className="card p-3 mb-3">
            <h3 className="mb-2">Spacing Classes</h3>
            <p className="mt-1">mt-1: Margin Top 0.25rem</p>
            <p className="mt-2">mt-2: Margin Top 0.5rem</p>
            <p className="mb-3">mb-3: Margin Bottom 1rem</p>
            <div className="p-2" style={{ border: '1px dashed #ccc' }}>
              p-2: Padding 0.5rem
            </div>
          </div>
          
          <div className="card p-3">
            <h3>Text Alignment</h3>
            <p className="text-left">Left aligned text</p>
            <p className="text-center">Center aligned text</p>
            <p className="text-right">Right aligned text</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
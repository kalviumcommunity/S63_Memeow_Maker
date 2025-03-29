# Cat Audio Files for Memeow Maker

This directory contains cat-themed audio files used throughout the Memeow Maker application.

## Audio Sources

The application uses the following audio sources:

1. Free sound effects from [Mixkit](https://mixkit.co/free-sound-effects/cat/)
2. Free sound effects from [Freesound](https://freesound.org/browse/tags/cat/)
3. Custom recorded audio (properly licensed)

## Default Audio Files

The default cat audio files included in this directory are:

- `purr.mp3`: Cat purring sound (used for upvotes)
- `meow.mp3`: Standard cat meow sound
- `hiss.mp3`: Cat hissing sound (used for downvotes)
- `cute-meow.mp3`: Cute kitten meow sound
- `angry-meow.mp3`: Angry cat sound

## Usage

To use these audio files in your components:

```jsx
import React, { useEffect, useState } from 'react';
import purrSound from '../assets/audio/purr.mp3';

const YourComponent = () => {
  const [audio] = useState(new Audio(purrSound));
  
  const playSound = () => {
    audio.currentTime = 0; // Reset audio to start
    audio.play();
  };
  
  // Clean up
  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);
  
  return (
    <button onClick={playSound}>Play Purr Sound</button>
  );
};
```

## Adding New Audio Files

When adding new audio files to this directory:

1. Use MP3 format for best browser compatibility
2. Keep file sizes small (under 100KB when possible)
3. Use descriptive filenames
4. Ensure proper licensing for all audio files
5. Update this README with information about the new audio files
# Cat Images for Memeow Maker

This directory contains cat images used throughout the Memeow Maker application.

## Image Sources

The application uses the following image sources:

1. Free stock photos from [Pexels](https://www.pexels.com/search/cat/)
2. User-uploaded images (stored in user-specific directories)
3. API-fetched images from [TheCatAPI](https://thecatapi.com/)

## Default Images

The default cat images included in this directory are:

- `cat1.jpg`: Sleepy orange tabby cat
- `cat2.jpg`: Black cat with green eyes
- `cat3.jpg`: Gray kitten playing
- `cat4.jpg`: Two cats cuddling
- `cat5.jpg`: Cat with funny expression

## Usage

To use these images in your components:

```jsx
import catImage1 from '../assets/images/cat1.jpg';

// Then in your component:
<img src={catImage1} alt="Sleepy orange tabby cat" />
```

Or for public images:

```jsx
<img src="/images/cat1.jpg" alt="Sleepy orange tabby cat" />
```

## Adding New Images

When adding new images to this directory:

1. Use optimized JPG or WebP formats for photos
2. Keep file sizes under 200KB when possible
3. Use descriptive filenames
4. Update this README with information about the new images
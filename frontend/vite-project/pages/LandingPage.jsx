import React from "react";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Memeow Maker 😸</h1>
      <p>
        **Memeow Maker** is a fun web app that lets you create hilarious cat memes!  
        Upload your own cat photos or choose from a gallery of funny cat images.  
        The app generates quirky captions and life advice like:  
        *"Don't let your human tell you when to nap!"*  

        <br /><br />
        **Key Features:**  
        🐱 **Upload Your Own Cat Photos or Pick from a Gallery** – Choose from your cat collection or a fun preloaded gallery.  
        🐾 **Random Captions & Life Advice** – Auto-generate funny, random captions and life advice.  
        ✏️ **Editable Text** – Customize font, size, and text placement.  
        👍 **Voting System** – Rate memes with:  
        ➡️ **Purr (Upvote)** – For memes you love.  
        ➡️ **Hiss (Downvote)** – For memes that need improvement.  
        📲 **Download & Share** – Save your meme or share it directly on social media!  

        <br />
        **Tech Stack:**  
        - **Frontend:** HTML5, CSS3, JavaScript (React)  
        - **Backend:** Node.js with Express  
        - **APIs:** TheCatAPI for images + Random Advice API  
        - **Deployment:** Frontend on Netlify/Vercel, Backend on Heroku/DigitalOcean  

        🚀 Create, laugh, and share – your perfect meme is just a click away!
      </p>
      <button onClick={() => window.open("https://s63-memeow-maker.onrender.com", "_blank")}>
        Create Your Own Meme!
      </button>
    </div>
  );
};

export default LandingPage;

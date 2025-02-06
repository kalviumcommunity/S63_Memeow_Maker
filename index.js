require("dotenv").config();
const express = require("express");



const app = express();
app.use(express.json());


// Connect to MongoDB Atlas


app.get("/", (req, res) => {
  res.send("Welcome to MEMEOW MAKER");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
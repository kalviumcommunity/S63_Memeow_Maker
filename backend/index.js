require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import connectDB
const bodyParser = require('body-parser');
const Routes = require('./routes'); // Import meme routes
// const Meme = require('./models/meme'); // Import the Meme model
const app = express();
 app.use(express.json())

app.use(bodyParser.json());
app.use(cors());
app.use('/api',Routes);

// Connect to MongoDB Atlas
connectDB();
let entities=[];



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
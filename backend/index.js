require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connectDB"); // Import the new connectDB function
const bodyParser = require('body-parser');
const Routes = require('./routes'); // Import routes
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use('/api', Routes);

// Connect to MySQL Database
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
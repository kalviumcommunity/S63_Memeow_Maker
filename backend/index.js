require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./connectDB"); // Import the new connectDB function
const bodyParser = require('body-parser');
const Routes = require('./routes'); // Import routes
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', Routes);

// Connect to MySQL Database
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
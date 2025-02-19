require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import connectDB



// const shapeRoutes = require('./routes');

const app = express();

// // 
// app.use(bodyParser.json());
// app.use('/api', shapeRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




app.use(express.json());
app.use(cors());


// Connect to MongoDB Atlas
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the  MEMEOW MAKER");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console. log(`Server is running on http://localhost:${process.env.PORT}`))
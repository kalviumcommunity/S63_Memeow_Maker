require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import connectDB
const routes = require("./routes"); // Import routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// Use the routes
app.use("/api", routes); // Prefix all routes with /api

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the MEMEOW MAKER");
});

const PORT = process.env.PORT || 400
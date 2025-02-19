// routes.js
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const connectDB = require("./connectDB");

let db;

// Connect to MongoDB and set the db variable
connectDB()
  .then((client) => {
    db = client.db("your_database_name"); // Replace with your database name
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Create a new meme
router.post("/memes", async (req, res) => {
  try {
    const meme = req.body;
    const result = await db.collection("memes").insertOne(meme);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create meme" });
  }
});

// Read all memes
router.get("/memes", async (req, res) => {
  try {
    const memes = await db.collection("memes").find().toArray();
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memes" });
  }
});

// Read a single meme by ID
router.get("/memes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meme = await db.collection("memes").findOne({ _id: new MongoClient.ObjectId(id) });
    if (!meme) {
      return res.status(404).json({ error: "Meme not found" });
    }
    res.status(200).json(meme);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meme" });
  }
});

// Update a meme by ID
router.put("/memes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMeme = req.body;
    const result = await db.collection("memes").updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { $set: updatedMeme }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Meme not found" });
    }
    res.status(200).json({ message: "Meme updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update meme" });
  }
});

// Delete a meme by ID
router.delete("/memes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("memes").deleteOne({ _id: new MongoClient.ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Meme not found" });
    }
    res.status(200).json({ message: "Meme deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete meme" });
  }
});

module.exports = router;
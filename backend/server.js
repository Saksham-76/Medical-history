const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware Part
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection part
mongoose.connect("mongodb://localhost:27017/medicalHistoryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Defining Schema
const medicalHistorySchema = new mongoose.Schema({
  height: String,
  weight: String,
  pulseRate: String,
  bloodPressure: String,
  glucose: String,
  allergies: {
    antibiotics: Boolean,
    aspirin: Boolean,
    localAnesthetics: Boolean,
    metals: Boolean,
    penicillin: Boolean,
    plastic: Boolean,
    sedative: Boolean,
    sleepingPills: Boolean,
  },
  surgeries: {
    appendix: Boolean,
    heart: Boolean,
    bladder: Boolean,
    liver: Boolean,
  },
  medicalConditions: {
    diabetes: Boolean,
    heart: Boolean,
    bloodPressure: Boolean,
    stroke: Boolean,
  },
  habits: {
    smoke: Boolean,
    drink: Boolean,
  },
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

// API Endpoint to Save Data
app.post("/api/submit", async (req, res) => {
  try {
    const newHistory = new MedicalHistory(req.body);
    await newHistory.save();
    res.status(201).json({ message: "Your form has been submitted" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

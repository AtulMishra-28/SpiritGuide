// server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs'); // Import bcrypt to hash passwords
// const path = require('path');
// require('dotenv').config(); // To load environment variables

// const app = express();
// const port = 5000;

// // Middleware to parse form data (application/x-www-form-urlencoded)
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // MongoDB connection string from .env
// const connectionString = process.env.MONGO_URI;

// // Connect to MongoDB using Mongoose
// mongoose.connect(connectionString)
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch(err => console.log('MongoDB connection error:', err));

//   app.get('/', (req, res) => {
//     res.send('Hello, Virtual Piano!');
//   });

//  // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, '../public')));


//   app.get('/signup', (req, res) => {
//     // Use path.join to form the correct path to signup.html
//     res.sendFile(path.join(__dirname, '../public', 'signup.html'));
//   });
  
  

// // Define the user schema
// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// // Signup Route
// app.post('/signup', async (req, res) => {
//   const { fullName, email, password } = req.body;

//   try {
//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('Email already registered');
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user and save to the database
//     const newUser = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

// // Send success message with a status code
// res.status(200).json({ message: 'User created successfully! You can now login.' });
// } catch (error) {
//   res.status(500).send('Error during signup');
// }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // If login is successful, send a success message
//     res.status(200).json({ message: 'Login successful!' });

//   } catch (error) {
//     res.status(500).send('Error during login');
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Spirit Guide !");
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "signup.html"));
});

// User Schema & Model
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully! You can now log in." });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "✅ Login successful!" });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/db");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("SecureNotes API is running!");
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Start server after DB connection is established
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();

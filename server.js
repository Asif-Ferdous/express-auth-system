const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware

connectDB();

app.use('/api', require('./routes/auth')); // ✅ Register route

app.get('/', (req, res) => res.send('API running...'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

// Graceful shutdown function
const shutDown = () => {
  console.log('🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Express server closed.');
    
    // Close database connection
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed.');
      process.exit(0);
    });
  });
};

// Handle termination signals
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

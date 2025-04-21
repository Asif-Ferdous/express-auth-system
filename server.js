const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware

connectDB();

app.use('/api', require('./routes/auth')); // ✅ Register route

app.get('/', (req, res) => res.send('API running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

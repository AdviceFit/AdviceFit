require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const memberRoutes = require('./routes/memberRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors());
app.use(express.json());

// User Routes
app.use('/api/users', userRoutes);
app.use('/members', memberRoutes);

// Error Handling Middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;

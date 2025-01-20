require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const memberRoutes = require('./routes/memberRoutes');
const visitorRoutes = require('./routes/visitorRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const centerRoutes = require('./routes/centerRoutes')

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors());
app.use(express.json());

// User Routes
app.use('/api/users', userRoutes);
app.use('/members', memberRoutes);
app.use('/visitors', visitorRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/center', centerRoutes);

// Error Handling Middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;

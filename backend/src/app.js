require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const memberRoutes = require("./routes/memberRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const centerRoutes = require("./routes/centerRoutes");
const packageRoutes = require("./routes/packageRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const sessionsRoutes = require("./routes/sessionRoutes");
const expensesRoutes = require("./routes/expenseRoutes");
const subscriptionsRoutes = require("./routes/subscriptionsRoutes");
const adminRightsRoutes = require("./routes/adminRightsRoutes");
const bulkMessageRoutes = require("./routes/bulkMessageRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/api/users", userRoutes);
app.use("/members", memberRoutes);
app.use("/visitors", visitorRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/center", centerRoutes);
app.use("/packages", packageRoutes);
app.use("/employee", employeeRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/expenses", expensesRoutes);
app.use("/subscriptions", subscriptionsRoutes);
app.use("/admin-rights", adminRightsRoutes);
app.use("/bulk-message", bulkMessageRoutes);

// Error Handling Middleware
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

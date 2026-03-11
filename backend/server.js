const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const recommendationRoutes = require("./routes/recommendation");
app.use("/api", recommendationRoutes);

const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoutes);

const quizRoutes = require("./routes/quizRoutes");
app.use("/quiz", quizRoutes);

const sessionRoutes = require("./routes/sessionRoutes");
const counselorRoutes = require("./routes/counselorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

app.use("/api/sessions", sessionRoutes);
app.use("/api/counselors", counselorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/resources", resourceRoutes);

const userCareerRoutes = require("./routes/userCareerRoutes");
app.use("/api/user-career", userCareerRoutes);


const collegeRoutes = require('./routes/collegeDetails');
app.use('/api/colleges', collegeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const completeProfileRoutes = require("./routes/complete-profile");
app.use("/api/user", completeProfileRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/user", profileRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

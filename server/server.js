import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import sendEmail from "./utils/sendEmail.js"; // ✅ ADD THIS

dotenv.config();
connectDB();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// --------------------
// Serve Uploaded Files (Resumes)
// --------------------
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// --------------------
// TEST EMAIL ROUTE ✅ ADD THIS
// --------------------
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "YOUR_OTHER_EMAIL@gmail.com", // 🔴 CHANGE THIS
      subject: "JobPortal Test Email",
      html: "<h2>Email system is working ✅</h2>"
    });

    res.send("Email sent (check inbox / spam)");
  } catch (error) {
    console.error("TEST EMAIL ERROR:", error.message);
    res.status(500).send("Email failed");
  }
});

// --------------------
// Root Route
// --------------------
app.get("/", (req, res) => {
  res.send("JobSphere API is running...");
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

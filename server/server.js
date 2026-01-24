import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();
connectDB();

const app = express();

// FIX __dirname in ES modules
const __dirname = path.resolve();

// CREATE UPLOADS FOLDER
const uploadRoot = path.join(__dirname, "uploads");
const resumeDir = path.join(uploadRoot, "resumes");

if (!fs.existsSync(uploadRoot)) fs.mkdirSync(uploadRoot);
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Serve resumes
app.use("/uploads", express.static(uploadRoot));

app.get("/", (req, res) => {
  res.send("JobSphere API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

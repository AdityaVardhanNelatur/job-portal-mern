import express from "express"; // ✅ THIS WAS MISSING

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  closeJob,
  getMyJobs,
  deleteJob,
  getJobsForUser
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ================= USER ROUTES ================= */
// Logged-in user → jobs with application status
router.get("/user", authMiddleware, getJobsForUser);

/* ================= ADMIN ROUTES ================= */
router.get("/my", authMiddleware, isAdmin, getMyJobs);
router.post("/create", authMiddleware, isAdmin, createJob);
router.put("/:id", authMiddleware, isAdmin, updateJob);
router.patch("/:id/close", authMiddleware, isAdmin, closeJob);
router.delete("/:id", authMiddleware, isAdmin, deleteJob);

/* ================= PUBLIC ROUTES ================= */
router.get("/", getAllJobs);
router.get("/:id", getJobById);

export default router;

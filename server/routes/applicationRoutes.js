import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

import {
  applyForJob,
  updateApplicationStatus,
  scheduleInterview,        // ✅ MUST BE IMPORTED
  getApplicationsByJob,
  getMyApplications
} from "../controllers/applicationController.js";

const router = express.Router();

/* ================= USER ================= */
router.post(
  "/apply/:jobId",
  authMiddleware,
  upload.single("resume"),
  applyForJob
);

router.get("/my", authMiddleware, getMyApplications);

/* ================= ADMIN ================= */
router.get(
  "/job/:jobId",
  authMiddleware,
  adminMiddleware,
  getApplicationsByJob
);

router.put(
  "/:applicationId/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

/* 🔥 INTERVIEW ROUTE (THIS WAS MISSING) */
router.put(
  "/:applicationId/interview",
  authMiddleware,
  adminMiddleware,
  scheduleInterview
);

export default router;

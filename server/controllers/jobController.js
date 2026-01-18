import Job from "../models/Job.js";
import Application from "../models/Application.js";

/* =========================
   CREATE JOB (ADMIN)
========================= */
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      jobType: req.body.jobType,
      status: "open",
      createdBy: req.user.id
    });

    res.status(201).json({ message: "Job created", job });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

/* =========================
   GET ALL OPEN JOBS (PUBLIC)
========================= */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* =========================
   GET JOB BY ID
========================= */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

/* =========================
   GET ADMIN JOBS
========================= */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch admin jobs" });
  }
};

/* =========================
   UPDATE JOB
========================= */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    Object.assign(job, req.body);
    await job.save();

    res.json({ message: "Job updated", job });
  } catch {
    res.status(500).json({ message: "Failed to update job" });
  }
};

/* =========================
   DELETE JOB (HARD DELETE)
========================= */
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    // 🔥 IMPORTANT: remove applications so users don't see "job no longer available"
    await Application.deleteMany({ job: req.params.id });

    res.json({ message: "Job deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

/* =========================
   CLOSE JOB
========================= */
export const closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "closed";
    await job.save();

    res.json({ message: "Job closed", job });
  } catch {
    res.status(500).json({ message: "Failed to close job" });
  }
};

/* =========================
   GET JOBS FOR USER
========================= */
export const getJobsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobs = await Job.find({ status: "open" }).lean();
    const applications = await Application.find({ applicant: userId });

    const appliedMap = {};
    applications.forEach(a => {
      appliedMap[a.job.toString()] = a.status;
    });

    const result = jobs.map(job => ({
      ...job,
      appliedStatus: appliedMap[job._id] || null
    }));

    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

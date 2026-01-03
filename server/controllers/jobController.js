import Job from "../models/Job.js";
import Application from "../models/Application.js";

/**
 * @desc   Create a new job (Admin only)
 * @route  POST /api/jobs/create
 * @access Private (Admin)
 */
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      jobType: req.body.jobType,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Job created",
      job
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message
    });
  }
};

/**
 * @desc   Get all OPEN jobs (public)
 * @route  GET /api/jobs
 */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/**
 * @desc   Get single job by ID
 * @route  GET /api/jobs/:id
 */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

/**
 * @desc   Get jobs created by logged-in admin
 * @route  GET /api/jobs/my
 */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin jobs",
      error: error.message
    });
  }
};

/**
 * @desc   Update job details
 * @route  PUT /api/jobs/:id
 */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    Object.assign(job, req.body);
    await job.save();

    res.status(200).json({
      message: "Job updated",
      job
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job" });
  }
};

/**
 * @desc   Delete job
 * @route  DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message
    });
  }
};

/**
 * @desc   Close a job
 * @route  PATCH /api/jobs/:id/close
 */
export const closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status === "closed") {
      return res.status(400).json({ message: "Job already closed" });
    }

    job.status = "closed";
    await job.save();

    res.status(200).json({
      message: "Job closed successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to close job" });
  }
};

/**
 * @desc   Get jobs for logged-in user with application status
 * @route  GET /api/jobs/user
 * @access Private (User)
 */
export const getJobsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobs = await Job.find({ status: "open" }).lean();

    const applications = await Application.find({
      applicant: userId
    }).select("job status");

    const appliedMap = {};
    applications.forEach(app => {
      appliedMap[app.job.toString()] = app.status;
    });

    const jobsWithStatus = jobs.map(job => ({
      ...job,
      appliedStatus: appliedMap[job._id.toString()] || null
    }));

    res.status(200).json(jobsWithStatus);
  } catch (error) {
    console.error("getJobsForUser error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

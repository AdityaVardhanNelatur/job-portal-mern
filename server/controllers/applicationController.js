import Application from "../models/Application.js";
import Job from "../models/Job.js";

/**
 * APPLY FOR JOB
 */
export const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.status === "closed")
    return res.status(400).json({ message: "Job closed" });

  const exists = await Application.findOne({ job: jobId, applicant: userId });
  if (exists)
    return res.status(400).json({ message: "Already applied" });

  if (!req.file)
    return res.status(400).json({ message: "Resume required" });

  const application = await Application.create({
    job: jobId,
    applicant: userId,
    resume: req.file.path
  });

  res.status(201).json({ message: "Applied successfully", application });
};

/**
 * UPDATE APPLICATION STATUS
 */
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  if (!["shortlisted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const application = await Application.findById(req.params.applicationId);
  if (!application)
    return res.status(404).json({ message: "Application not found" });

  application.status = status;
  await application.save();

  res.json({ message: "Status updated", application });
};

/**
 * GET APPLICATIONS BY JOB (ADMIN)
 */
export const getApplicationsByJob = async (req, res) => {
  const applications = await Application.find({ job: req.params.jobId })
    .populate("applicant", "name email")
    .populate("job", "title company");

  const result = applications.map(app => ({
    ...app._doc,
    resumeUrl: `${req.protocol}://${req.get("host")}/${app.resume}`
  }));

  res.json(result);
};

/**
 * ✅ GET MY APPLICATIONS (FILTER DELETED JOBS)
 */
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    applicant: req.user.id
  }).populate("job", "title company");

  // 🔥 REMOVE APPLICATIONS WHERE JOB IS DELETED
  const filtered = applications.filter(app => app.job !== null);

  res.json(filtered);
};

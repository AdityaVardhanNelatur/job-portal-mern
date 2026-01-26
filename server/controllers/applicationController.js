import Application from "../models/Application.js";
import Job from "../models/Job.js";

/* ================= APPLY FOR JOB ================= */
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status === "closed")
      return res.status(400).json({ message: "Job closed" });

    const exists = await Application.findOne({
      job: jobId,
      applicant: userId
    });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE STATUS ================= */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const application = await Application.findById(req.params.applicationId);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    res.json({ message: "Status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= SCHEDULE INTERVIEW ================= */
export const scheduleInterview = async (req, res) => {
  try {
    const { date, time, mode, location } = req.body;

    const application = await Application.findById(req.params.applicationId);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    application.status = "interview_scheduled";
    application.interview = { date, time, mode, location };

    await application.save();

    res.json({ message: "Interview scheduled", application });
  } catch (error) {
    res.status(500).json({ message: "Failed to schedule interview" });
  }
};

/* ================= GET APPLICATIONS BY JOB ================= */
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("applicant", "name email")
      .populate("job", "title company")
      .lean();

    res.json(
      applications.map(app => ({
        ...app,
        resumeUrl: `${req.protocol}://${req.get("host")}/${app.resume}`,
        interview: app.interview || null
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ================= GET MY APPLICATIONS ================= */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job", "title company");

    res.json(
      applications
        .filter(app => app.job !== null)
        .map(app => ({
          ...app._doc,
          interview: app.interview || null
        }))
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

/*
=====================================================
 APPLY FOR JOB (USER)
 POST /api/applications/apply/:jobId
=====================================================
*/
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // 1. Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Check job status
    if (job.status === "closed") {
      return res.status(400).json({
        message: "Job applications are closed"
      });
    }

    // 3. Prevent duplicate applications ✅ FIXED
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    // 4. Check resume upload
    if (!req.file) {
      return res.status(400).json({
        message: "Resume (PDF) is required"
      });
    }

    // 5. Create application ✅ FIXED
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: req.file.path
    });

    // 6. Send confirmation email
    const user = await User.findById(userId);
    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "Job Application Submitted",
        html: `
          <h3>Application Submitted</h3>
          <p>Hi ${user.name},</p>
          <p>You have successfully applied for 
          <strong>${job.title}</strong> at 
          <strong>${job.company}</strong>.</p>
        `
      });
    }

    res.status(201).json({
      message: "Job applied successfully",
      application
    });

  } catch (error) {
    console.error("APPLY FOR JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
=====================================================
 UPDATE APPLICATION STATUS (ADMIN)
 PUT /api/applications/:applicationId/status
=====================================================
*/
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId)
      .populate("applicant", "name email")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    application.status = status;
    await application.save();

    // Notify user
    if (application.applicant?.email) {
      await sendEmail({
        to: application.applicant.email,
        subject: `Application ${status.toUpperCase()}`,
        html: `
          <h3>Application Update</h3>
          <p>Hello ${application.applicant.name},</p>
          <p>Your application for 
          <strong>${application.job.title}</strong> at 
          <strong>${application.job.company}</strong>
          has been <strong>${status}</strong>.</p>
        `
      });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
=====================================================
 GET APPLICATIONS BY JOB (ADMIN)
 GET /api/applications/job/:jobId
=====================================================
*/
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {
    console.error("FETCH APPLICATIONS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
};

/*
=====================================================
 GET MY APPLICATIONS (USER)
 GET /api/applications/my
=====================================================
*/
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job", "title company location salary");

    res.status(200).json(applications);

  } catch (error) {
    console.error("MY APPLICATIONS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
};

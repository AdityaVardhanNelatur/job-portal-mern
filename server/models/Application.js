import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resume: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "shortlisted",
        "interview_scheduled",
        "rejected",
        "hired"
      ],
      default: "pending"
    },

    interview: {
      date: Date,
      time: String,
      mode: String,
      location: String
    }
  },
  { timestamps: true }
);

applicationSchema.index(
  { job: 1, applicant: 1 },
  { unique: true }
);

export default mongoose.model("Application", applicationSchema);

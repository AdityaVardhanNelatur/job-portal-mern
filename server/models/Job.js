// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    salary: { type: String },

    jobType: {
      type: String,
      enum: ["Full-Time", "Internship"],
      default: "Full-Time"
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);

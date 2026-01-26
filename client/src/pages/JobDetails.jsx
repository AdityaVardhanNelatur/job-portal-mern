import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { MapPin, IndianRupee, Briefcase } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      // 1️⃣ Get job details
      const jobRes = await API.get(`/jobs/${id}`);
      setJob(jobRes.data);

      // 2️⃣ Get my applications
      const appRes = await API.get("/applications/my");
      const matched = appRes.data.find(
        app => app.job?._id === id
      );

      if (matched) setApplication(matched);

      setLoading(false);
    } catch (error) {
      console.error("Failed to load job details", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading job details...</p>;
  }

  if (!job) {
    return <p className="p-6 text-red-500">Job not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 shadow">
        {/* HEADER */}
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-600 text-lg">{job.company}</p>

        <div className="flex gap-6 mt-4 text-gray-700 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin size={18} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <IndianRupee size={18} /> {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={18} /> {job.jobType}
          </span>
        </div>

        <hr className="my-6" />

        {/* DESCRIPTION */}
        <h2 className="text-xl font-semibold mb-2">
          Job Description
        </h2>
        <p className="text-gray-700 whitespace-pre-line">
          {job.description}
        </p>

        {/* ================= INTERVIEW DETAILS ================= */}
        {application?.status === "interview_scheduled" &&
          application.interview && (
            <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-lg">
              <h3 className="font-bold text-green-700 text-lg">
                🎉 Interview Scheduled – All the Best!
              </h3>

              <div className="mt-2 text-sm text-green-800 space-y-1">
                <p>
                  📅{" "}
                  {new Date(
                    application.interview.date
                  ).toLocaleDateString()}
                </p>
                <p>⏰ {application.interview.time}</p>
                <p>
                  💻 {application.interview.mode}
                </p>
                <p>
                  📍 {application.interview.location}
                </p>
              </div>
            </div>
          )}

        {/* ================= APPLY BUTTON ================= */}
        {!application && (
          <button
            onClick={() => navigate(`/apply/${job._id}`)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        )}

        {application && (
          <button
            disabled
            className="mt-6 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg cursor-not-allowed"
          >
            Already Applied ({application.status})
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;

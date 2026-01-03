import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { MapPin, IndianRupee, Briefcase } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  if (!job) return <p className="p-6">Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-600 text-lg">{job.company}</p>

        <div className="flex gap-6 mt-4 text-gray-700">
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

        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {job.description}
        </p>

        <button
          onClick={() => navigate(`/apply/${job._id}`)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;

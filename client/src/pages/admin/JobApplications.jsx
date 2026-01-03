import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    setApplications(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  if (loading) return <p className="p-6">Loading applications...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {applications.length === 0 && (
        <p>No applications for this job.</p>
      )}

      {applications.map(app => (
        <div
          key={app._id}
          className="border rounded p-4 mb-3 bg-white shadow"
        >
          <p className="font-semibold">
            {app.applicant.name} ({app.applicant.email})
          </p>

          <p className="mt-1">
            Status:{" "}
            <span className="font-bold uppercase">
              {app.status}
            </span>
          </p>

          <div className="mt-3 space-x-3">
            <button
              onClick={() => updateStatus(app._id, "shortlisted")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Shortlist
            </button>

            <button
              onClick={() => updateStatus(app._id, "rejected")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplications;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const AdminJobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get(`/applications/job/${jobId}`)
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, [jobId]);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    setApplications(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>

      {applications.length === 0 && (
        <p>No applications yet.</p>
      )}

      {applications.map(app => (
        <div key={app._id} className="border p-4 mb-3 rounded">
          <p><b>{app.applicant.name}</b> ({app.applicant.email})</p>
          <p>Status: <b>{app.status}</b></p>

          <div className="mt-2">
            <button
              onClick={() => updateStatus(app._id, "shortlisted")}
              className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
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

export default AdminJobApplications;

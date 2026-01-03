import { useEffect, useState } from "react";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/applications/my")
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 && (
        <p>You haven’t applied to any jobs yet.</p>
      )}

      {applications.map(app => (
        <div
          key={app._id}
          className="bg-white p-4 mb-3 rounded shadow"
        >
          {/* ✅ HANDLE DELETED JOB SAFELY */}
          {app.job ? (
            <>
              <h3 className="font-semibold">{app.job.title}</h3>
              <p className="text-gray-600">{app.job.company}</p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-gray-500">
                Job no longer available
              </h3>
              <p className="text-gray-400 text-sm">
                This job was removed by the recruiter
              </p>
            </>
          )}

          <p className="mt-2">
            Status:{" "}
            <span
              className={`font-bold ${
                app.status === "shortlisted"
                  ? "text-green-600"
                  : app.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {app.status.toUpperCase()}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;

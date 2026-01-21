import { useEffect, useState } from "react";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.get("/applications/my")
      .then(res => {
        const validApps = res.data.filter(app => app.job);
        setApplications(validApps);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 && (
        <p>You haven’t applied to any jobs yet.</p>
      )}

      {applications.map(app => (
        <div
          key={app._id}
          className="bg-white p-5 mb-4 rounded-xl shadow border"
        >
          <h3 className="font-semibold text-lg">
            {app.job.title}
          </h3>
          <p className="text-gray-600">
            {app.job.company}
          </p>

          <p className="mt-2">
            Status:{" "}
            <span
              className={`font-bold uppercase ${
                app.status === "shortlisted"
                  ? "text-green-600"
                  : app.status === "interview_scheduled"
                  ? "text-blue-600"
                  : app.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {app.status}
            </span>
          </p>

          <button
            onClick={() => setSelected(app)}
            className="mt-3 px-4 py-1 border rounded hover:bg-gray-100"
          >
            View Details
          </button>
        </div>
      ))}

      {/* ================= DETAILS MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow">
            <h3 className="text-xl font-bold mb-2">
              {selected.job.title}
            </h3>

            <p className="text-gray-600 mb-3">
              {selected.job.company}
            </p>

            <p className="mb-3">
              <b>Status:</b>{" "}
              <span className="uppercase">
                {selected.status}
              </span>
            </p>

            {/* ✅ INTERVIEW DETAILS */}
            {selected.status === "interview_scheduled" &&
              selected.interview && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4">
                  <p className="font-semibold text-blue-700 mb-1">
                    Interview Scheduled
                  </p>
                  <p className="text-sm">
                    📅 <b>Date:</b>{" "}
                    {new Date(
                      selected.interview.date
                    ).toDateString()}
                    <br />
                    ⏰ <b>Time:</b>{" "}
                    {selected.interview.time}
                    <br />
                    💻 <b>Mode:</b>{" "}
                    {selected.interview.mode}
                    <br />
                    📍 <b>Location:</b>{" "}
                    {selected.interview.location}
                  </p>
                </div>
              )}

            {/* NO INTERVIEW YET */}
            {selected.status !== "interview_scheduled" && (
              <p className="text-sm text-gray-500 mb-4">
                Interview has not been scheduled yet.
              </p>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-1 border rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;

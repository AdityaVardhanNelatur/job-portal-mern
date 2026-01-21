import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    location: ""
  });

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    const res = await API.get(`/applications/job/${jobId}`);
    setApplications(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    await fetchApplications(); // 🔥 IMPORTANT
  };

  const scheduleInterview = async () => {
    await API.put(`/applications/${selected._id}/interview`, form);

    setSelected(null);
    setForm({
      date: "",
      time: "",
      mode: "Online",
      location: ""
    });

    fetchApplications();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Job Applications</h2>

      {applications.map(app => (
        <div
          key={app._id}
          className="border p-5 mb-4 rounded-xl bg-white shadow"
        >
          <p className="font-semibold text-lg">
            {app.applicant.name} ({app.applicant.email})
          </p>

          <p className="mt-1">
            Status:{" "}
            <span className="font-bold uppercase text-blue-600">
              {app.status}
            </span>
          </p>

          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            View Resume (PDF)
          </a>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="mt-4 flex gap-2">
            {/* PENDING */}
            {app.status === "pending" && (
              <>
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
              </>
            )}

            {/* SHORTLISTED → SCHEDULE */}
            {app.status === "shortlisted" && (
              <button
                onClick={() => setSelected(app)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Schedule Interview
              </button>
            )}

            {/* INTERVIEW DONE */}
            {app.status === "interview_scheduled" && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
                Interview Scheduled
              </span>
            )}
          </div>
        </div>
      ))}

      {/* ================= INTERVIEW MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow">
            <h3 className="font-bold mb-4 text-lg">
              Schedule Interview
            </h3>

            <input
              type="date"
              className="border p-2 w-full mb-2 rounded"
              value={form.date}
              onChange={e =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              type="time"
              className="border p-2 w-full mb-2 rounded"
              value={form.time}
              onChange={e =>
                setForm({ ...form, time: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-2 rounded"
              value={form.mode}
              onChange={e =>
                setForm({ ...form, mode: e.target.value })
              }
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <input
              placeholder="Meeting link / Address"
              className="border p-2 w-full mb-4 rounded"
              value={form.location}
              onChange={e =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={scheduleInterview}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;

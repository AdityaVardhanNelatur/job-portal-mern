import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api"; // adjust path if needed

const AdminJobApplications = () => {
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
    await fetchApplications(); // 🔥 REQUIRED
  };

  const scheduleInterview = async () => {
    if (!form.date || !form.time || !form.location) {
      alert("Fill all interview details");
      return;
    }

    await API.put(
      `/applications/${selected._id}/interview`,
      form
    );

    setSelected(null);
    setForm({
      date: "",
      time: "",
      mode: "Online",
      location: ""
    });

    await fetchApplications();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>

      {applications.map(app => (
        <div key={app._id} className="border p-4 mb-4 rounded bg-white">
          <p className="font-semibold">
            {app.applicant.name} ({app.applicant.email})
          </p>

          <p className="mt-1">
            Status: <b>{app.status.toUpperCase()}</b>
          </p>

          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View Resume (PDF)
          </a>

          <div className="mt-3 flex gap-2">
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

            {app.status === "shortlisted" && (
              <button
                onClick={() => setSelected(app)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Schedule Interview
              </button>
            )}

            {app.status === "interview_scheduled" && (
              <span className="text-blue-700 font-semibold">
                Interview Scheduled
              </span>
            )}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Schedule Interview</h3>

            <input
              type="date"
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
            <input
              type="time"
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, time: e.target.value })}
            />
            <select
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, mode: e.target.value })}
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
            <input
              placeholder="Meeting link / Address"
              className="border p-2 w-full mb-3"
              onChange={e => setForm({ ...form, location: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelected(null)}>Cancel</button>
              <button
                onClick={scheduleInterview}
                className="bg-blue-600 text-white px-3 py-1 rounded"
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
export default AdminJobApplications;

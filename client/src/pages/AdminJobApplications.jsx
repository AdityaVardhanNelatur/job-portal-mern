import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const AdminJobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const today = new Date().toISOString().split("T")[0];

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
    await fetchApplications();
  };

  const scheduleInterview = async () => {
    await API.put(`/applications/${selected._id}/interview`, form);
    setSelected(null);
    setForm({ date: "", time: "", mode: "Online", location: "" });
    fetchApplications();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>

      {applications.map(app => (
        <div key={app._id} className="border p-4 mb-4 bg-white rounded">
          <p className="font-semibold">
            {app.applicant.name} ({app.applicant.email})
          </p>
          <p>Status: <b>{app.status}</b></p>

          {app.status === "pending" && (
            <>
              <button onClick={() => updateStatus(app._id, "shortlisted")}
                className="bg-green-600 text-white px-3 py-1 mr-2 rounded">
                Shortlist
              </button>
              <button onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded">
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
            <p className="text-blue-700 font-semibold mt-2">
              Interview Scheduled
            </p>
          )}
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Schedule Interview</h3>

            <input type="date" min={today}
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, date: e.target.value })} />

            <input type="time"
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, time: e.target.value })} />

            <input placeholder="Meeting link / Location"
              className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, location: e.target.value })} />

            <button
              onClick={scheduleInterview}
              className="bg-blue-600 text-white px-3 py-1 rounded">
              Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobApplications;

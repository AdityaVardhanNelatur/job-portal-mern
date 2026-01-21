import { useState } from "react";
import API from "../../services/api";

const ScheduleInterviewModal = ({ applicationId, close, refresh }) => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/applications/${applicationId}/interview`,
        form
      );

      refresh();
      close();
    } catch (err) {
      alert("Failed to schedule interview");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Schedule Interview
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="date"
            required
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            type="time"
            required
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />

          <select
            className="w-full border p-2 rounded"
            value={form.mode}
            onChange={(e) =>
              setForm({ ...form, mode: e.target.value })
            }
          >
            <option>Online</option>
            <option>Offline</option>
          </select>

          <input
            type="text"
            placeholder="Meeting link / Location"
            className="w-full border p-2 rounded"
            required
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Schedule
            </button>

            <button
              type="button"
              onClick={close}
              className="flex-1 border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;

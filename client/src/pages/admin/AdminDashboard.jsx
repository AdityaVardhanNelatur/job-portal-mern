import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import StatCard from "../../components/admin/StatCard";
import JobTable from "../../components/admin/JobTable";
import JobFormModal from "../../components/admin/JobFormModal";
import { getMyJobs } from "../../services/jobService";

import {
  Briefcase,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setSelectedJob(null);
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => j.status === "open").length;
  const closedJobs = jobs.filter(j => j.status === "closed").length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage jobs and track hiring activity
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            icon={Briefcase}
            color="bg-blue-600"
          />
          <StatCard
            title="Open Jobs"
            value={openJobs}
            icon={CheckCircle}
            color="bg-green-600"
          />
          <StatCard
            title="Closed Jobs"
            value={closedJobs}
            icon={XCircle}
            color="bg-red-600"
          />
        </div>

        {/* JOB MANAGEMENT */}
        <JobTable
          jobs={jobs}
          onCreate={openCreateModal}
          onEdit={openEditModal}
          refresh={fetchJobs}
        />
      </main>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <JobFormModal
          job={selectedJob}
          close={() => setShowModal(false)}
          refresh={fetchJobs}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

import API from "./api";

// ADMIN DASHBOARD
export const getMyJobs = async () => {
  const res = await API.get("/jobs/my");
  return res.data;
};

export const createJob = async (data) => {
  await API.post("/jobs/create", data);
};

export const updateJob = async (id, data) => {
  await API.put(`/jobs/${id}`, data);
};

export const deleteJob = async (id) => {
  await API.delete(`/jobs/${id}`);
};

export const closeJob = async (id) => {
  await API.patch(`/jobs/${id}/close`);
};

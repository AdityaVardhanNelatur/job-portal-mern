🚀 JobSphere – MERN Job Portal with Role-Based Authentication & Interview Management

JobSphere is a full-stack MERN job portal that implements JWT-based authentication, role-based authorization (Admin/User), and a complete hiring workflow — from job creation to interview scheduling and application tracking.

This project demonstrates how real-world recruitment platforms handle authentication, authorization, resume management, and admin-driven hiring decisions.

📌 Project Overview

JobSphere uses a single login system for both users and admins.
Access control is enforced using JWT tokens with embedded roles.

Admin Capabilities

Create, update, and delete job postings

View all job applications

Access uploaded resumes

Shortlist or reject candidates

Schedule interviews

User Capabilities

Register & login

View available jobs

Apply for jobs by uploading resumes

Track application status

View interview schedule details (if shortlisted)

✨ Key Features
🔐 Authentication & Authorization

JWT-based authentication

Single login page for Admin & User

Role-based access control

Protected routes

🧑‍💼 Job Management (Admin)

Create new job postings

Update existing jobs

Delete jobs

View all applicants per job

📄 Resume Handling

Users upload resumes during job application

Admin can view/download resumes

Secure file handling

📝 Application Management

Application status tracking:

Pending

Shortlisted

Rejected

Admin controls application status

📅 Interview Scheduling

Admin schedules interviews for shortlisted candidates

Interview details stored in database

User sees interview details in dashboard

📊 User Application Tracking

Users can track:

Pending applications

Shortlisted applications

Rejected applications

Interview schedules (date & message)

🏗️ Tech Stack
Frontend

React (Vite)

React Router DOM

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (MongoDB Atlas)

JSON Web Tokens (JWT)

📁 Project Structure
JobSphere/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── JobCard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

🔐 Authentication & Role Flow

User/Admin accesses /login

Credentials are verified

JWT token generated with role info

Token stored on client

Access granted based on role

Role Redirection

User → Job Listings / User Dashboard

Admin → Admin Dashboard

🧑‍💼 Complete Hiring Workflow
👤 User Flow

User logs in

Views available jobs

Applies to job by uploading resume

Tracks application status:

Pending

Shortlisted

Rejected

If shortlisted, views interview schedule details

🛠️ Admin Flow

Admin logs in

Creates / updates / deletes job postings

Views applicants for each job

Reviews uploaded resumes

Shortlists or rejects candidates

Schedules interviews for shortlisted users

▶️ Run the Project Locally
Backend Setup
cd backend
npm install
npm start

Frontend Setup
cd frontend
npm install
npm run dev

🔒 Environment Variables

Create .env inside backend/

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

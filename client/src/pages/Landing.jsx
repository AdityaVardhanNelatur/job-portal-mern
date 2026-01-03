import { Link } from "react-router-dom";
import {
  Briefcase,
  Upload,
  Users,
  CheckCircle
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span>  
            <br />or Hire Top Talent
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            JobPortal connects job seekers and recruiters with a fast,
            simple, and smart hiring process.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="font-semibold mb-4">Why JobPortal?</h3>

          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={18} />
              Easy job application with resume upload
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={18} />
              Admin shortlist & reject workflow
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={18} />
              Secure authentication & role based access
            </li>
          </ul>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Briefcase size={30} />}
              title="Job Listings"
              text="Browse and apply to jobs posted by verified recruiters."
            />
            <Feature
              icon={<Upload size={30} />}
              title="Resume Upload"
              text="Upload resumes securely and track application status."
            />
            <Feature
              icon={<Users size={30} />}
              title="Admin Dashboard"
              text="Manage jobs, view applicants, shortlist or reject."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-3">👤 For Job Seekers</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Create account</li>
                <li>Browse jobs</li>
                <li>Upload resume & apply</li>
                <li>Track application status</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-3">🧑‍💼 For Admins</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Create job posts</li>
                <li>View applicants</li>
                <li>Shortlist / Reject</li>
                <li>Close jobs</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Ready to start your journey?
          </h2>
          <p className="mt-3 text-blue-100">
            Join JobPortal today and simplify hiring or job searching.
          </p>

          <Link
            to="/register"
            className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
    <div className="flex justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-gray-600 mt-2">{text}</p>
  </div>
);

export default Landing;

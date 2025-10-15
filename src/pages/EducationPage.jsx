import React from "react";
import { Link } from "react-router-dom";
import educationLogo from "../assets/education-logo.jpg"; // ✅ Make sure this path is correct

function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Page Content */}
      <div className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Education Program
        </h1>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          Epicare supports education in emergencies, classroom construction, temporary learning spaces,
          sponsorship programs, and mental wellness for students. Through partnerships with schools
          and communities, we promote access to equitable, quality education for all.
        </p>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition-all"
          >
            ← Back to Programs
          </Link>
        </div>
      </div>

      {/* Education Logo Section */}
      <footer className="bg-blue-700 text-white py-10 mt-10">
        <div className="text-center">
          <img
            src={educationLogo}
            alt="Education Logo"
            className="mx-auto w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-semibold tracking-wide">
            EDUCATION PROGRAM
          </h2>
          <p className="text-blue-100 text-sm mt-2">
            Empowering learners through knowledge, resilience, and opportunity.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default EducationPage;

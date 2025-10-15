// src/pages/Volunteer.jsx

import React from "react";
import { Link } from "react-router-dom";

function Volunteer() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Volunteer with Epicare</h1>
      <p className="text-gray-700 mb-6">
        Join our dedicated volunteer community and help us create lasting impact.
        Whether it’s in healthcare, community outreach, or fundraising, your time
        makes a difference.
      </p>
      <Link to="/volunteer/apply">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600">
          Apply to Volunteer
        </button>
      </Link>
    </div>
  );
}

export default Volunteer;

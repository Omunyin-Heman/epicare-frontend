// src/pages/Partner.jsx
import React from "react";
import { Link } from "react-router-dom";

function Partner() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Partner with Epicare</h1>
      <p className="text-gray-700 mb-6">
        Collaborate with Epicare to bring sustainable healthcare programs to
        underserved communities. We welcome partnerships with NGOs, corporates,
        and government institutions.
      </p>
      <Link to="/partner/apply">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500">
          Become a Partner
        </button>
      </Link>
    
    </div>
  );
}
export default Partner;


// src/components/GetInvolved.jsx
import React from "react";
import { Link } from "react-router-dom";

function GetInvolved() {
  return (
    <section id="involved" className="py-16 bg-gray-50 text-center">
      <h3 className="text-3xl font-bold mb-6">Get Involved</h3>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Join us in creating lasting change. You can support Epicare by volunteering, partnering, or donating.
      </p>

      <div className="flex justify-center space-x-6">
        <Link to="/volunteer">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600">
            Volunteer
          </button>
        </Link>

        {/* 🔗 Directly goes to PartnerApplication page */}
        <Link to="/partner/apply">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-500">
            Partner
          </button>
        </Link>

        <Link to="/support">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300">
            Donate
          </button>
        </Link>
      </div>
    </section>
  );
}

export default GetInvolved;

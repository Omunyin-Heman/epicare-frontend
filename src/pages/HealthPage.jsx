import React from "react";
import { Link } from "react-router-dom";

function HealthPage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-50 min-h-screen text-centerp-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-green-700">Health Program</h1>
      <p className="text-gray-700 leading-relaxed max-w-3xl mb-8">
        We work closely with private sectors, civil societies, and governance structures
        to improve community health and wellness programs.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          PRIMARY HEALTHCARE PROGRAM
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mb-6">
          In many areas in Kenya, children have to walk for hours to the nearest
          health clinic, which is often no more than one room with few drugs and
          no trained staff. Poor health infrastructure combined with high rates
          of preventable diseases is the new normal. Epicare is working with partners
          to improve access to primary healthcare in Kenya and globally at large.
        </p>

        <img
          src="/healthclinic-logo.jpg"
          alt="Primary Healthcare Program"
          className="rounded-2xl shadow-lg w-full max-w-2xl border border-gray-200"
        />
      </div>
    </div>
  );
}

export default HealthPage;

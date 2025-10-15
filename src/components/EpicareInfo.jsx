import React from "react";

function EpicareInfo() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="container mx-auto text-center">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
          EPICARE INTERNATIONAL ORGANISATION
        </h2>

        {/* Core Values */}
        <div className="flex justify-center flex-wrap gap-6 mb-8 text-blue-700 font-semibold tracking-wider">
          <span>RESPECT</span>
          <span>•</span>
          <span>EQUITY</span>
          <span>•</span>
          <span>DIGNITY</span>
        </div>

        {/* Intro Paragraph */}
        <p className="max-w-4xl mx-auto text-gray-700 leading-relaxed mb-10">
          Epicare employs participatory approaches strategic planning and
          community mobilization to find sustainable solutions to community
          problems. Through partnerships with UN Agencies and NGOs, we provide
          long-term responses to challenges faced by vulnerable communities.
        </p>

        {/* Focused Programmatic Areas */}
        <h3 className="text-2xl font-bold text-blue-800 mb-6">
          FOCUSED PROGRAMMATIC AREAS
        </h3>
        <p className="max-w-3xl mx-auto text-gray-700 mb-10">
          Epicare focuses on six core program areas and their cross-cutting
          issues, which are integrated across other program areas to maximize
          impact.
        </p>

        {/* WASH Program Highlight */}
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100 mb-10">
          <h4 className="text-xl font-semibold text-blue-700 mb-3">
            WATER SANITATION AND HYGIENE PROGRAM (WASH)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Since 2021, Epicare has worked to improve children’s access to clean
            water, sanitation, and hygiene both in schools and communities.
            Our initiatives include construction and rehabilitation of WASH
            infrastructure and promoting hygiene education to foster healthy
            learning environments and community wellbeing.
          </p>

          {/* Image */}
          <div className="mt-6">
            <img
              src="/water-tap.jpg"
              alt="Water Tap Project"
              className="rounded-2xl shadow-lg mx-auto max-w-full sm:w-2/3 md:w-1/2 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EpicareInfo;

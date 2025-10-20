import React from "react";
import { Link } from "react-router-dom";

function Programs() {
  const buttons = [
    { name: "EDUCATION", color: "bg-blue-500 hover:bg-blue-600", id: "education" },
    { name: "HEALTH", color: "bg-green-500 hover:bg-green-600", id: "health" },
    { name: "NUTRITION", color: "bg-orange-500 hover:bg-orange-600", id: "nutrition" },
    { name: "FOOD SECURITY", color: "bg-purple-500 hover:bg-purple-600", id: "food" },
    { name: "GBV", color: "bg-pink-500 hover:bg-pink-600", id: "gbv" },
    { name: "AGRICULTURE", color: "bg-teal-500 hover:bg-teal-600", id: "agriculture" },
  ];

  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Programs</span>
        </h2>

        <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed mb-10">
          Since <span className="font-semibold text-orange-600">2021</span>, <span className="font-semibold text-pink-600">Epicare</span> has been on a mission to <span className="text-orange-500 font-medium">heal communities</span> and foster a future of resilience and equality.  
          We empower individuals by <span className="font-semibold text-green-600">strengthening health systems</span>,  
          <span className="font-semibold text-blue-600">educating youth</span>,  
          and <span className="font-semibold text-purple-600">enhancing food and agricultural practices</span>.  
          <br /><br />
          Our programs are designed to <span className="text-pink-500 font-semibold">uplift the vulnerable</span>,  
          inspire innovation, and drive long-term transformation where it matters most within our communities.
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 place-items-center">
          {buttons.map((btn) => (
            <Link
              key={btn.id}
              to={`/${btn.id}`}
              className={`${btn.color} text-white font-semibold w-48 h-16 flex items-center justify-center rounded-full shadow-md transform transition duration-300 hover:scale-105`}
            >
              {btn.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;

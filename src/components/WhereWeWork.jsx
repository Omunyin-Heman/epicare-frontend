import React from "react";

function WhereWeWork() {
  const locations = [
    {
      title:
        "Nairobi, Homa Bay, Kisii, Kisumu, Migori, Busia, Bomet & South Sudan",
      description:
        "Food security and livelihood programs funded by Maisha Masinani. Youth micro-enterprise development included.",
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Urban Communities",
      description:
        "Primary healthcare outreach, nutrition programs, and WASH initiatives in urban slums.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Schools & Learning Centers",
      description:
        "Education support, classroom construction, and mental wellness programs for students.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Rural Villages",
      description:
        "Agriculture training, rangeland & water management, and community resilience projects.",
      color: "from-pink-400 to-red-500",
    },
  ];

  return (
    <section id="where" className="py-20 bg-gradient-to-b from-gray-50 to-white text-center">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight">
          Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">We Work</span>
        </h3>

        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
          Epicare is actively transforming lives across both <span className="font-semibold text-teal-600">rural</span> and{" "}
          <span className="font-semibold text-blue-600">urban communities</span> in Kenya and beyond.  
          Through collaboration with grassroots organizations and local leaders, we implement projects that restore dignity, equity, and opportunity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {locations.map((loc, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${loc.color} text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <h4 className="font-bold text-xl mb-3">{loc.title}</h4>
              <p className="text-sm leading-relaxed opacity-90">{loc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhereWeWork;

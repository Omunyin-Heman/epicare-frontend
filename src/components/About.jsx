import React from "react";
import { motion } from "framer-motion";

function About() {
  const values = ["Dignity", "Equity", "Respect", "Accountability"];

  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white text-center overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-orange-100 to-transparent opacity-40 blur-3xl"></div>

      <div className="relative container mx-auto px-6">
        {/* Animated heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight"
        >
          Why{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            Epicare?
          </span>
        </motion.h3>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-12"
        >
          <span className="font-semibold text-pink-600">
            EPICARE INTERNATIONAL ORGANISATION
          </span>{" "}
          is a grassroots organization powered by the belief that a better world
          is possible — where every individual can thrive in dignity, health,
          and equality. We work hand in hand with communities to create lasting
          change that uplifts lives.
        </motion.p>

        {/* Three grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Core Values */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
          >
            <h4 className="text-xl font-semibold mb-4 text-orange-600">
              Core Values
            </h4>
            <ul className="text-gray-700 space-y-2 text-base">
              {values.map((val, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center gap-2 hover:text-pink-600 transition-colors"
                >
                  <span className="text-pink-500 text-lg">•</span> {val}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-8 bg-gradient-to-br from-pink-100 via-orange-50 to-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
          >
            <h4 className="text-xl font-semibold mb-4 text-pink-600">Vision</h4>
            <p className="text-gray-700 leading-relaxed">
              A world where communities thrive in dignity, health, and harmony —
              empowered to lead their own sustainable development.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-8 bg-gradient-to-br from-teal-50 via-blue-50 to-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
          >
            <h4 className="text-xl font-semibold mb-4 text-teal-600">
              Mission
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Delivering bold, sustainable solutions that promote equity,
              empower marginalized groups, and strengthen community systems for
              future resilience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;

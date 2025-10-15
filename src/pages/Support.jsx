import React from "react";
import givingTuesdayImg from "../assets/giving-tuesday.jpg";
import globalGivingImg from "../assets/global-giving.jpg";

function Support() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-12">Donate to Epicare International</h1>

      {/* Flexbox row for horizontal stacking */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-12">
        {/* Giving Tuesday */}
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Giving Tuesday</h2>
          <a
            href="https://www.givingtuesday.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={givingTuesdayImg}
              alt="Giving Tuesday"
              className="mx-auto rounded-lg shadow-md w-64 hover:scale-105 transition-transform duration-300"
            />
          </a>
          <p className="mt-4 text-gray-700">
            Join us this Giving Tuesday and support our programs that change lives.
          </p>
        </section>

        {/* Global Giving */}
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Global Giving</h2>
          <a
            href="https://www.globalgiving.org/donate/PROJECT_ID/YOUR-EPICARE-PROJECT/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={globalGivingImg}
              alt="Global Giving"
              className="mx-auto rounded-lg shadow-md w-64 hover:scale-105 transition-transform duration-300"
            />
          </a>
          <p className="mt-4 text-gray-700">
            Support us on Global Giving and be part of our mission worldwide.
          </p>
        </section>
      </div>

      {/* EPIO Section Below */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">EPIO</h2>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          EPICARE INTERNATIONAL ORGANISATION
        </h3>

        <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-medium text-gray-700">
          <span>- DIGNITY</span>
          <span>- ACCOUNTABILITY</span>
          <span>- RESPECT</span>
        </div>

        <p className="mt-8 text-xl font-semibold text-gray-800">
          EPICARE INTERNATIONAL ORGANISATION
        </p>
      </div>
    </div>
  );
}

export default Support;

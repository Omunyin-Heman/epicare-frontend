import React from "react";
import { Link } from "react-router-dom";

function NutritionChartPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-50 min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6 text-orange-600">
        Nutrition Chart
      </h1>

      <img
        src="/Nutrition-image.jpg"
        alt="Detailed Nutrition Chart"
        className="rounded-2xl shadow-lg max-w-3xl w-full h-auto mb-8"
      />

      <Link
        to="/nutrition"
        className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition"
      >
        ← Back to Nutrition Program
      </Link>
    </div>
  );
}

export default NutritionChartPage;

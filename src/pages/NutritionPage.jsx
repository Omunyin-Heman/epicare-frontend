// src/pages/NutritionPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NutritionPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Nutrition Program</h1>

      <p className="text-gray-700 leading-relaxed max-w-3xl mb-6">
        Epicare addresses malnutrition through food security and nutrition education,
        targeting vulnerable groups affected by conflict and drought.
      </p>

      <p className="text-gray-600 leading-relaxed max-w-3xl mb-6">
        The Nutrition being a big challenge hence the result of poor child feeding practices
        and food insecurity caused by conflict, drought, flood, fire outbreak, pest and
        diseases, and price shock. Malnutrition rates in Kenya continue to remain above
        the emergency thresholds, with 23% of children and communities malnourished.
      </p>

      {/* Clickable image linking to full chart */}
      <img
        src="/Nutrition-chart.jpg"
        alt="Nutrition Chart"
        className="rounded-2xl shadow-lg w-60 h-auto mb-6 cursor-pointer transition-transform hover:scale-105"
        onClick={() => (window.location.href = "/nutrition-chart")}
     />


      <Link
        to="/"
        className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition"
      >
        ← Back to Programs
      </Link>
    </div>
  );
}

export default NutritionPage;

import React from "react";
import { Link } from "react-router-dom";

function FoodPage() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">Food Security Program</h1>
      <p className="text-gray-700 leading-relaxed max-w-3xl">
        Implementing food security and livelihood programs in Homa Bay County and promoting sustainable agriculture for long-term growth.
      </p>
       <h2 className="text-gray-700 leading-relaxed max-w-3xl">FOOD SECURITY & LIVELIHOODS AND YOUTH MICRO ENTERPRICE </h2>
       <h3 className="text-gray-700 leading-relaxed max-w-3xl">DEVELOPMENT PROGRAM</h3>
       <p className="text-gray-700 leading-relaxed max-w-3xl mb-6 text-center">Food security livelihood is one of the EPICARE department currently in partnership with
          and funded Maisha masinani and is implementing food security livelihood in WEST KASIPUL, 
          Homa
          Bay County. Food for children program initiative funded by Giving Tuesday. 
        </p>

        <img
          src="/Nutrition-chart.jpg"
          alt="Nutrition Chart"
          className="rounded-2xl shadow-lg w-60 h-auto mb-6 cursor-pointer hover:scale-110 hover:shadow-2xl transition-transform duration-300"
        />
    </div>
  );
}
export default FoodPage;

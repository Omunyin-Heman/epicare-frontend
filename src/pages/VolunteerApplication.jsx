import React, { useState } from "react";

const API_URL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_LOCAL_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL;


function VolunteerApplication() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // ✅ success/error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://my-backend-1-8oq8.onrender.com/api/volunteers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage({
          type: "error",
          text: `Server responded with ${response.status}: ${text}`,
        });
        return;
      }

      // ✅ Success message and form clear
      setMessage({ type: "success", text: "✅ Application submitted successfully!" });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: "❌ Network error: " + err.message });
    } finally {
      setIsSubmitting(false);

      // Auto-hide message after 4 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Volunteer Application
      </h1>

      {message.text && (
        <div
          className={`mb-4 text-center py-2 px-4 rounded-md font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <textarea
          name="skills"
          placeholder="Your Skills (e.g. Nutrition, First Aid, IT)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g. Weekends, Full-time)"
          value={formData.availability}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default VolunteerApplication;

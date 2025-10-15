import React, { useState } from "react";
import API_BASE_URL from "../config"; // ✅ Import your centralized API URL

function PartnerApplication() {
  const [formData, setFormData] = useState({
    organization_name: "",
    contact_person: "",
    phone: "",
    email: "",
    partnershipType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/partners/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage({
          type: "error",
          text: `❌ Server responded with ${response.status}: ${text}`,
        });
        return;
      }

      // ✅ Success message + reset form
      setMessage({
        type: "success",
        text: "✅ Partnership request submitted successfully!",
      });

      setFormData({
        organization_name: "",
        contact_person: "",
        phone: "",
        email: "",
        partnershipType: "",
        message: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "❌ Network error: " + err.message,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Partner with Us
      </h2>

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
          name="organization_name"
          placeholder="Organization Name"
          value={formData.organization_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="contact_person"
          placeholder="Contact Person"
          value={formData.contact_person}
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

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <select
          name="partnershipType"
          value={formData.partnershipType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select Partnership Type</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="collaboration">Collaboration</option>
          <option value="donation">Donation</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          rows="4"
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

export default PartnerApplication;

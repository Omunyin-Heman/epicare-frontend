import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../config";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contacts/`, formData);

      if (res.status === 201 || res.status === 200) {
        setStatus({
          type: "success",
          message: "✅ Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: `❌ Unexpected response (${res.status}). Please try again.`,
        });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({
        type: "error",
        message:
          err.response?.data?.detail ||
          "❌ Failed to send message. Please check your network or try again later.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000); // Auto-clear after 4 seconds ✅
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-pink-50 text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-blue-100 to-transparent opacity-40 blur-3xl"></div>

      <div className="relative container mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 tracking-tight"
        >
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            Touch
          </span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-12"
        >
          Have questions, partnership ideas, or simply want to say hello?  
          We'd love to hear from you — let’s make a difference together!
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-left border border-gray-100"
        >
          <div className="grid gap-5">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-lg font-semibold text-white shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-pink-500 hover:shadow-xl hover:from-pink-500 hover:to-orange-400"
              }`}
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </motion.button>
          </div>
        </motion.form>

        {/* ✅ Success/Error message display */}
        {status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 text-lg font-medium ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </motion.div>
        )}

        <div className="mt-12 text-gray-600 text-sm">
          <p>
            📍 Nairobi, Kenya | 📧{" "}
            <a
              href="mailto:omunyinheheman@gmail.com"
              className="text-blue-600 hover:underline"
            >
              omunyinheheman@gmail.com
            </a>{" "}
            | ☎️ +254 708 698 260
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;

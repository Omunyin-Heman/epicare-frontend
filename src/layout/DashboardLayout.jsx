// src/layout/DashboardLayout.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 w-64 bg-white shadow-lg p-6 flex flex-col z-20 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-pink-600">Dashboard</h2>
          <button
            className="text-gray-700 text-2xl font-bold"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Sidebar title for desktop */}
        <h2 className="hidden md:block text-2xl font-bold text-pink-600 mb-6 text-center">
          Dashboard
        </h2>

        <nav className="flex flex-col space-y-3">
          <Link
            to="/dashboard/partners"
            className={`block px-4 py-2 rounded-md ${
              isActive("/dashboard/partners")
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            Partner Applications
          </Link>

          <Link
            to="/dashboard/volunteers"
            className={`block px-4 py-2 rounded-md ${
              isActive("/dashboard/volunteers")
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            Volunteers Dashboard
          </Link>

          <Link
            to="/dashboard/contacts"
            className={`block px-4 py-2 rounded-md ${
              isActive("/dashboard/contacts")
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            Contacts Dashboard
          </Link>

          <Link
            to="/"
            className="mt-6 block px-4 py-2 rounded-md text-gray-700 hover:bg-pink-100 hover:text-pink-600"
            onClick={() => setSidebarOpen(false)}
          >
            Back to Main Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden mb-4 text-2xl font-bold text-pink-600"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

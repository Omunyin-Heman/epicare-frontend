// src/pages/PartnerDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardToolbar from "../components/DashboardToolbar";

function PartnerDashboard() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toolbar states
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch applications
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/partners/")
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching partner applications:", err);
        setLoading(false);
      });
  }, []);

  // Apply search, filter, sort
  useEffect(() => {
    let data = [...applications];

    // Filter
    if (filterType !== "All") {
      data = data.filter(app => app.partnershipType === filterType);
    }

    // Search
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      data = data.filter(
        app =>
          app.organizationName?.toLowerCase().includes(query) ||
          app.contactPerson?.toLowerCase().includes(query) ||
          app.email?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortField) {
      data.sort((a, b) => {
        const aValue = String(a[sortField] || "").toLowerCase();
        const bValue = String(b[sortField] || "").toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    setFilteredApps(data);
    setCurrentPage(1);
  }, [applications, search, filterType, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV download
  const downloadCSV = () => {
    if (filteredApps.length === 0) return alert("No applications to export!");
    const headers = [
      "Date",
      "Organization",
      "Contact Person",
      "Phone",
      "Email",
      "Partnership Type",
      "Message",
    ];
    const rows = filteredApps.map(app => [
      app.Timestamp,
      app.organizationName,
      app.contactPerson,
      app.phone,
      app.email,
      app.partnershipType,
      app.message,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "partner_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading partner applications...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Partner Applications</h2>

      <DashboardToolbar
        search={search}
        setSearch={setSearch}
        filter={filterType}
        setFilter={setFilterType}
        filterOptions={["Sponsorship", "Collaboration", "Donation", "Other"]}
        filterLabel="Partnership Type"
        onDownload={downloadCSV}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={[
          { label: "Date", value: "Timestamp" },
          { label: "Organization", value: "organizationName" },
          { label: "Type", value: "partnershipType" },
        ]}
      />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Organization</th>
              <th className="border p-2 text-left">Contact Person</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Partnership Type</th>
              <th className="border p-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.map((app, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2">{app.Timestamp}</td>
                <td className="border p-2">{app.organizationName}</td>
                <td className="border p-2">{app.contactPerson}</td>
                <td className="border p-2">{app.phone}</td>
                <td className="border p-2">{app.email}</td>
                <td className="border p-2">{app.partnershipType}</td>
                <td className="border p-2">{app.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {paginatedApps.map((app, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm bg-white">
            <p><strong>Date:</strong> {app.Timestamp}</p>
            <p><strong>Organization:</strong> {app.organizationName}</p>
            <p><strong>Contact:</strong> {app.contactPerson}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Type:</strong> {app.partnershipType}</p>
            <p><strong>Message:</strong> {app.message}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-pink-100 hover:text-pink-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PartnerDashboard;

// src/pages/VolunteersDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardToolbar from "../components/DashboardToolbar";

function VolunteersDashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toolbar states
  const [search, setSearch] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("All");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch volunteers
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/volunteers/")
      .then(res => res.json())
      .then(data => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching volunteers:", err);
        setLoading(false);
      });
  }, []);

  // Apply search, filter, sort
  useEffect(() => {
    let data = [...volunteers];

    // Filter
    if (filterAvailability !== "All") {
      data = data.filter(v => v.availability === filterAvailability);
    }

    // Search
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      data = data.filter(
        v =>
          v.fullName?.toLowerCase().includes(query) ||
          v.email?.toLowerCase().includes(query) ||
          v.phone?.toLowerCase().includes(query) ||
          v.skills?.toLowerCase().includes(query)
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

    setFilteredVolunteers(data);
    setCurrentPage(1);
  }, [volunteers, search, filterAvailability, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const paginatedVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV download
  const downloadCSV = () => {
    if (filteredVolunteers.length === 0) return alert("No volunteer records to export!");
    const headers = ["Full Name", "Email", "Phone", "Skills", "Availability"];
    const rows = filteredVolunteers.map(v => [
      v.fullName,
      v.email,
      v.phone,
      v.skills,
      v.availability,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "volunteers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading volunteers...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Volunteers Dashboard</h2>

      <DashboardToolbar
        search={search}
        setSearch={setSearch}
        filter={filterAvailability}
        setFilter={setFilterAvailability}
        filterOptions={["Weekends", "Full-time", "Part-time"]}
        filterLabel="Availability"
        onDownload={downloadCSV}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={[
          { label: "Name", value: "fullName" },
          { label: "Email", value: "email" },
          { label: "Availability", value: "availability" },
        ]}
      />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Full Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Skills</th>
              <th className="border p-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVolunteers.map((v, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2">{v.fullName}</td>
                <td className="border p-2">{v.email}</td>
                <td className="border p-2">{v.phone}</td>
                <td className="border p-2">{v.skills}</td>
                <td className="border p-2">{v.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {paginatedVolunteers.map((v, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm bg-white">
            <p><strong>Name:</strong> {v.fullName}</p>
            <p><strong>Email:</strong> {v.email}</p>
            <p><strong>Phone:</strong> {v.phone}</p>
            <p><strong>Skills:</strong> {v.skills}</p>
            <p><strong>Availability:</strong> {v.availability}</p>
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

export default VolunteersDashboard;

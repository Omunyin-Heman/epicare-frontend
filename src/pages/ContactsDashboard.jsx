// src/components/ContactsDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardToolbar from "../components/DashboardToolbar";

function ContactsDashboard() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toolbar states
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("All"); // email domain filter
  const [filterStatus, setFilterStatus] = useState("All"); // Read / Unread
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch contacts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contacts/")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        setLoading(false);
      });
  }, []);

  // Extract unique email domains
  const emailDomains = ["All"];
  contacts.forEach(c => {
    const domain = c.email?.split("@")[1];
    if (domain && !emailDomains.includes(domain)) emailDomains.push(domain);
  });

  // Apply search, filter, sort
  useEffect(() => {
    let data = [...contacts];

    // Filter by domain
    if (filterDomain !== "All") {
      data = data.filter(c => c.email.split("@")[1] === filterDomain);
    }

    // Filter by status
    if (filterStatus !== "All") {
      data = data.filter(c => c.status === filterStatus);
    }

    // Search
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      data = data.filter(
        c =>
          c.name?.toLowerCase().includes(query) ||
          c.email?.toLowerCase().includes(query) ||
          c.message?.toLowerCase().includes(query)
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

    setFilteredContacts(data);
    setCurrentPage(1); // Reset page on filter/search
  }, [contacts, search, filterDomain, filterStatus, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV download
  const downloadCSV = () => {
    if (filteredContacts.length === 0) return alert("No contacts to export!");
    const headers = ["Name", "Email", "Message", "Status", "Date"];
    const rows = filteredContacts.map(c => [
      c.name,
      c.email,
      c.message,
      c.status,
      new Date(c.created_at).toLocaleString()
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Messages</h2>

      <DashboardToolbar
        search={search}
        setSearch={setSearch}
        filter={filterDomain}
        setFilter={setFilterDomain}
        filterOptions={emailDomains}
        filterLabel="Email Domain"
        onDownload={downloadCSV}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={[
          { label: "Name", value: "name" },
          { label: "Email", value: "email" },
          { label: "Date", value: "created_at" },
        ]}
      />

      {/* Status Filter */}
      <div className="mt-4">
        <label className="mr-2 font-semibold">Message Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          <option value="All">All</option>
          <option value="Read">Read</option>
          <option value="Unread">Unread</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Message</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.message}</td>
                <td className="border p-2">{c.status || "Unread"}</td>
                <td className="border p-2">{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {paginatedContacts.map((c, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm bg-white">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Message:</strong> {c.message}</p>
            <p><strong>Status:</strong> {c.status || "Unread"}</p>
            <p><strong>Date:</strong> {new Date(c.created_at).toLocaleString()}</p>
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

export default ContactsDashboard;

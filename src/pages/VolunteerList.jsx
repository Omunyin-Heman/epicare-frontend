import React, { useEffect, useState } from "react";
import axios from "axios";

function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/volunteers/")
      .then((response) => {
        setVolunteers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading volunteers...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registered Volunteers</h1>

      {volunteers.length === 0 ? (
        <p className="text-center text-gray-600">No volunteers found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td className="border p-2">{volunteer.id}</td>
                <td className="border p-2">{volunteer.name}</td>
                <td className="border p-2">{volunteer.phone}</td>
                <td className="border p-2">{volunteer.email}</td>
                <td className="border p-2">{volunteer.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VolunteerList;

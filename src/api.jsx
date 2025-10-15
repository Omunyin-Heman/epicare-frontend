// src/api.js
const API_BASE_URL = "https://my-backend-1-8oq8.onrender.com";

export async function fetchPartners() {
  const res = await fetch(`${API_BASE_URL}/api/partners/`);
  return res.json();
}

export async function fetchVolunteers() {
  const res = await fetch(`${API_BASE_URL}/api/volunteers/`);
  return res.json();
}

// You can add more API calls here (payments, contacts, etc.)
export async function fetchVolunteers() {
  const res = await fetch(`${API_BASE_URL}/api/contacts/`);
  return res.json();
}

export async function fetchVolunteers() {
  const res = await fetch(`${API_BASE_URL}/api/payments/`);
  return res.json();
}
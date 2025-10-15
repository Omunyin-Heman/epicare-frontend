const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://my-backend-1-8oq8.onrender.com"
    : "http://127.0.0.1:8000";

export default API_BASE_URL;

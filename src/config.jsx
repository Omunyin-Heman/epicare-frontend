const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://my-backend-1-8oq8.onrender.com"
    : "http://127.0.0.1:8000";

export { API_BASE_URL };

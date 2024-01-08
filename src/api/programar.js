import axios from "./axios.js";

export const programarRequest = (formData) =>
  axios.post("/api/programar", formData);

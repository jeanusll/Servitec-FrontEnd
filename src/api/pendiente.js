import axios from "./axios";

//Create
export const createPendienteRequest = async (pendiente) =>
  axios.post("/pendiente", pendiente);

//read
export const getAllPendientesRequest = async () => axios.get("/pendientes");
export const getPendienteRequest = async (id) => axios.get(`/pendiente/${id}`);

//update
export const updatePendienteRequest = async (id, pendiente) =>
  axios.put(`/pendiente/${id}`, pendiente);

//delete
export const deletePendienteRequest = async (id) =>
  axios.delete(`/pendiente/${id}`);

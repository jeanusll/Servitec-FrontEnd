import axios from "./axios.js";

//create
export const createServicioRequest = (servicio) =>
  axios.post("/api/servicio", servicio);

//read
export const getAllServiciosRequest = (page) =>
  axios.get(`/api/servicios?page=${page}`);
export const getServicioRequest = (id) => axios.get(`/api/servicio/${id}`);

export const findServicioRequest = (data, page) =>
  axios.post(`/api/servicio/find?page=${page}`, { data });

//update
export const updateServicioRequest = (servicio) =>
  axios.put(`/api/servicio`, servicio);

//delete
export const deleteServicioRequest = (id) =>
  axios.delete(`/api/servicio/${id}`);

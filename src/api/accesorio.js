import axios from "./axios";

//create
export const createAccesorioRequest = async (accesorio) =>
  axios.post("/api/accesorio", accesorio);

//read
export const getAllAccesoriosRequest = async (page) =>
  axios.get(`/api/accesorios?page=${page}`);
export const getAccesorioRequest = async (id) =>
  axios.get(`/api/accesorio/${id}`);

//update
export const updateAccesorioRequest = async (id, accesorio) =>
  axios.put(`/api/accesorio/${id}`, accesorio);

//delete
export const deleteAccesorioRequest = async (id) =>
  axios.delete(`/api/accesorio/${id}`);

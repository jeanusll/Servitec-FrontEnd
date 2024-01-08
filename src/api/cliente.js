import axios from "./axios";

//create
export const createClienteRequest = async (cliente) =>
  axios.post("/api/cliente", cliente);

//read
export const getAllClientesRequest = async (page) =>
  axios.get(`/api/clientes?page=${page}`);
export const getClienteRequest = async (id) => axios.get(`/api/cliente/${id}`);
export const findClienteRequest = async (data, page) =>
  axios.post(`/api/cliente/find?page=${page}`, data);
//update
export const updateClienteRequest = async (id, cliente) =>
  axios.put(`/api/cliente/${id}`, cliente);

//delete
export const deleteClienteRequest = async (id) =>
  axios.delete(`/api/cliente/${id}`);

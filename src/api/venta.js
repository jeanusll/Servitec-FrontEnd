import axios from "./axios";
//create
export const createVentaRequest = async (venta) =>
  axios.post("/api/venta", { formData: venta });

//read
export const getAllVentasRequest = async (page) =>
  axios.get(`/api/ventas?page=${page}`);

export const getVentaRequest = async (id) => axios.get(`/venta/${id}`);

//update
export const updateVentaRequest = async (id, venta) =>
  axios.put(`/venta/${id}`, venta);

//delete
export const deleteVentaRequest = async (id) => axios.delete(`/venta/${id}`);

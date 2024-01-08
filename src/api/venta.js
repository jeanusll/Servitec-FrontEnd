import axios from "./axios";
//create
export const createVentaRequest = async (venta) => axios.post("/venta", venta);

//read
export const getAllVentasRequest = async () => axios.get("/ventas");
export const getVentaRequest = async (id) => axios.get(`/venta/${id}`);

//update
export const updateVentaRequest = async (id, venta) =>
  axios.put(`/venta/${id}`, venta);

//delete
export const deleteVentaRequest = async (id) => axios.delete(`/venta/${id}`);

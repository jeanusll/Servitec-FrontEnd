import axios from "./axios";

//create
export const createCargaRequest = async (carga) => axios.post("/carga", carga);

//read
export const getAllCargasRequest = async () => axios.get("/cargas");
export const getCargaRequest = async (id) => axios.get(`/carga/${id}`);

//update
export const updateCargaRequest = async (id, carga) =>
  axios.put(`/carga/${id}`, carga);

//delete
export const deleteCargaRequest = async (id) => axios.delete(`/carga/${id}`);

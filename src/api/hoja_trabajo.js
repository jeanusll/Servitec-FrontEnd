import axios from "./axios.js";

export const getHojaTrabajoRequest = async (date) =>
  axios.get(`/api/hoja_trabajo/${date}`);

export const downloadHojaTrabajoRequest = async (date) => {
  const response = await axios.get(`/api/hoja_trabajo/download/${date}`, {
    responseType: "arraybuffer",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "hoja_trabajo.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const checkServicioRequest = async (id) =>
  await axios.patch(`/api/servicio/check/${id}`);

export const reprogramarServicioRequest = (id, date) =>
  axios.post("/api/servicio/reprogramar", { id, date });

import axios from "./axios.js";

export const getHojaTrabajoRequest = async (date) =>
  axios.get(`/api/hoja_trabajo/${date}`);

export const downloadHojaTrabajoRequest = async (date) => {
  try {
    const response = await axios.get(`/api/hoja_trabajo/download/${date}`, {
      responseType: "arraybuffer", // Cambio de "blob" a "arraybuffer"
    });
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }); // Tipo de archivo .docx
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "hoja_trabajo.docx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo Word:", error);
  }
};

export const checkServicioRequest = async (id) =>
  await axios.patch(`/api/servicio/check/${id}`);

export const reprogramarServicioRequest = (id, date) =>
  axios.post("/api/servicio/reprogramar", { id, date });

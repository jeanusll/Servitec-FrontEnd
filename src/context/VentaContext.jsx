import { createContext, useContext, useState } from "react";
import {
  createVentaRequest,
  deleteVentaRequest,
  getAllVentasRequest,
  updateVentaRequest,
} from "../api/venta.js";
const VentasContext = createContext();

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context)
    throw new Error("useServicios must be used within a ServicioProvider");
  return context;
};

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllVentas = async (page) => {
    try {
      const res = await getAllVentasRequest(page);

      if (res.status === 200) {
        console.log(res.data);
        setVentas(res.data.ventas);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.log("Error al obtener las ventas");
    }
  };

  const createventa = async (data) => {
    try {
      const res = await createVentaRequest(data);

      if (res.status === 200) {
        getAllVentas(currentPage);
        return res.data;
      }
    } catch (error) {
      console.log("Error al crear los datos");
    }
  };

  return (
    <VentasContext.Provider
      value={{ ventas, currentPage, totalPages, createventa, getAllVentas }}
    >
      {children}
    </VentasContext.Provider>
  );
};

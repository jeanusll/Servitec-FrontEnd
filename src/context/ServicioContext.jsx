import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext.jsx";
import {
  getAllServiciosRequest,
  findServicioRequest,
  updateServicioRequest,
} from "../api/servicio.js";

const ServicioContext = createContext();

export const useServicios = () => {
  const context = useContext(ServicioContext);
  if (!context)
    throw new Error("useServicios must be used within a ServicioProvider");
  return context;
};

export const ServicioProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllServicios = async (page) => {
    try {
      const res = await getAllServiciosRequest(page);
      if (res.status === 200) {
        setServicios(res.data.servicios);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const updateServicio = async (id, servicio) => {
    await updateServicioRequest(id, servicio);
    getAllServicios(currentPage);
  };

  const findServicio = async (searchTerm, page) => {
    try {
      const res = await findServicioRequest(searchTerm, page);
      console.log(res.data);
      setServicios(res.data.servicios);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
    getAllServicios(page);
  };

  return (
    <ServicioContext.Provider
      value={{
        servicios,
        currentPage,
        totalPages,
        errors,
        loading,
        setCurrentPage: handleSetCurrentPage,
        getAllServicios,
        findServicio,
        updateServicio,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};

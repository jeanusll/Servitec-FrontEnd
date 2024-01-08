import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext.jsx";
import {
  createAccesorioRequest,
  deleteAccesorioRequest,
  getAllAccesoriosRequest,
  getAccesorioRequest,
  updateAccesorioRequest,
} from "../api/accesorio.js";

const InventarioContext = createContext();

export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context)
    throw new Error("useAccesorios must be used within an AccesorioProvider");
  return context;
};

export const InventarioProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [accesorios, setAccesorios] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllAccesorios = async (page) => {
    try {
      const res = await getAllAccesoriosRequest(page);
      setAccesorios(res.data.accesorios);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };
  const createAccesorio = async (data, page) => {
    try {
      const res = await createAccesorioRequest(data);
      if (res.status === 200) {
        getAllAccesorios(page);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const deleteAccesorio = async (accesorioId) => {
    try {
      const res = await deleteAccesorioRequest(accesorioId);
      if (res.status === 200) {
        getAllAccesorios(currentPage);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const updateAccesorio = async (accesorioId, data) => {
    try {
      const res = await updateAccesorioRequest(accesorioId, data);
      if (res.status === 200) {
        getAllAccesorios(page);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const handleSetCurrentPage = (event, page) => {
    setCurrentPage(page);
    getAllAccesorios(page);
  };

  return (
    <InventarioContext.Provider
      value={{
        accesorios,
        currentPage,
        totalPages,
        errors,
        loading,
        handleSetCurrentPage,
        getAllAccesorios,
        deleteAccesorio,
        createAccesorio,
        updateAccesorio,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

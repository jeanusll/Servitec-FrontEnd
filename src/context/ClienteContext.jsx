import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./authContext.jsx";

import {
  createClienteRequest,
  deleteClienteRequest,
  getAllClientesRequest,
  getClienteRequest,
  updateClienteRequest,
  findClienteRequest,
} from "../api/cliente.js";

const ClienteContext = createContext();

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
export const ClienteProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllClients = async (page) => {
    try {
      const res = await getAllClientesRequest(page);
      if (res.status === 200) {
        setClientes(res.data.clientes);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const findCliente = async (data, page) => {
    try {
      const res = await findClienteRequest({ data }, page);
      setClientes(res.data.clientes);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const findClienteReturn = async (data, page) => {
    try {
      const res = await findClienteRequest({ data }, page);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createCliente = async (data, page) => {
    try {
      const res = await createClienteRequest(data);
      if (res.status === 200) {
        getAllClients(currentPage);
        return res.data;
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const deleteCliente = async (id) => {
    try {
      const res = await deleteClienteRequest(id);
      if (res.status === 200) {
        getAllClients(currentPage);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const updateCliente = async (id, data) => {
    try {
      const res = await updateClienteRequest(id, data);
      if (res.status === 200) {
        getAllClients(currentPage);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };
  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
    getAllClients(page);
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        currentPage,
        totalPages,
        errors,
        loading,
        setCurrentPage: handleSetCurrentPage,
        getAllClients,
        createCliente,
        deleteCliente,
        findClienteReturn,
        updateCliente,
        findCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

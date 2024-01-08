import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
} from "@mui/material";

import { useClientes } from "../../context/ClienteContext";

export const BuscarCliente = ({ handleSelectCliente }) => {
  const [clientes, setClientes] = useState([]);
  const { findClienteReturn } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSetCurrentPage = async (event, page) => {
    setCurrentPage(page);
    console.log(currentPage, page);
    await handleFind(page);
  };

  const handleFind = async (page) => {
    try {
      const foundClientes = await findClienteReturn(searchTerm, page);
      setClientes(foundClientes.clientes);
      setCurrentPage(foundClientes.currentPage);
      setTotalPages(foundClientes.totalPages);
      setClienteSeleccionado(null);
    } catch (error) {
      console.error("Error al buscar clientes:", error);
    }
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePickCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    handleSelectCliente(cliente);
  };

  return (
    <Grid container spacing={2} height={"40vh"}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label="Buscar por nombre, DNI o teléfono"
              margin="normal"
              fullWidth
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleFind}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "25vh", overflowY: "auto" }}
        >
          {" "}
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableCell>Nombre</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Referencia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow
                  key={cliente._id}
                  onClick={() => handlePickCliente(cliente)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      clienteSeleccionado &&
                      clienteSeleccionado._id === cliente._id
                        ? "#e0e0e0"
                        : "inherit",
                  }}
                >
                  <TableCell>{cliente.nombre_apellido}</TableCell>
                  <TableCell>{cliente.dni}</TableCell>
                  <TableCell>{cliente.num_telefono}</TableCell>
                  <TableCell>{cliente.direccion}</TableCell>
                  <TableCell>{cliente.referencia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={parseInt(totalPages)}
            page={parseInt(currentPage)}
            onChange={handleSetCurrentPage}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

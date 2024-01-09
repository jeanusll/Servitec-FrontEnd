import React, { useState, useEffect } from "react";
import { useClientes } from "../context/ClienteContext";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Pagination,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import ClienteDialog from "../components/ClienteDialog.jsx";
import { VerClienteDialog } from "../components/VerClienteDialog.jsx";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../context/authContext";

export const ClientesPage = () => {
  const {
    clientes,
    currentPage,
    totalPages,
    loading,
    getAllClients,
    setCurrentPage,
    createCliente,
    deleteCliente,
    findCliente,
    updateCliente,
  } = useClientes();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [cliente, setCliente] = useState({
    nombre_apellido: "",
    dni: "",
    num_telefono: "",
    distrito: "",
    direccion: "",
    referencia: "",
    comentario: "",
  });
  const [verClienteDialogOpen, setVerClienteDialogOpen] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFinding, setIsFinding] = useState(false);
  const { isAuthenticated } = useAuth();
  const handleVerCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setVerClienteDialogOpen(true);
  };

  const handleCloseVerClienteDialog = () => {
    setVerClienteDialogOpen(false);
    setClienteSeleccionado(null);
  };

  const handleDialogOpen = (clienteData) => {
    if (clienteData && clienteData._id) {
      setCliente(clienteData);
    }
    setDialogOpen(true);
  };
  const handleEdit = (clientId) => {
    const clienteSeleccionado = clientes.find(
      (cliente) => cliente._id === clientId
    );
    handleDialogOpen(clienteSeleccionado);
  };

  const handleCloseDialog = () => {
    setCliente({
      nombre_apellido: "",
      dni: "",
      num_telefono: "",
      distrito: "",
      direccion: "",
      referencia: "",
      comentario: "",
    });
    setDialogOpen(false);
  };

  const handleSubmitDialog = (formData) => {
    if (cliente && cliente._id) {
      updateCliente(cliente._id, formData);
    } else {
      createCliente(formData, currentPage);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleDelete = async (clientId) => {
    try {
      await deleteCliente(clientId);
      getAllClients(currentPage);
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFindClient = async () => {
    setIsFinding(true);
    await findCliente(searchTerm, 1);
  };

  const handleViewAll = async () => {
    getAllClients(1);
    setSearchTerm("");
    setIsFinding(false);
  };

  const handleSetCurrentPage = async (event, page) => {
    if (isFinding) {
      findCliente(searchTerm, page);
    } else {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getAllClients(currentPage);
  }, []);

  return (
    <Box mt={4} mx="auto" maxWidth={"80%"}>
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        justifyContent="space-between"
      >
        <Typography variant="h1" component="div">
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Agregar Cliente
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          marginRight: 0,
          paddingRight: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={8}>
          <TextField
            label="Buscar por nombre, DNI o teléfono"
            margin="normal"
            fullWidth
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Grid>
        <Grid item xs={6} sm={2} sx={{ textAlign: "center" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleFindClient}
            sx={{ marginLeft: "8px" }}
          >
            <SearchIcon />
            Buscar Cliente
          </Button>
        </Grid>
        <Grid item xs={6} sm={2} sx={{ textAlign: "center", padding: 0 }}>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleViewAll}
            sx={{ marginLeft: "8px", marginRight: "0px" }}
          >
            <VisibilityIcon />
            Mostrar todos
          </Button>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "60vh", overflowY: "auto" }}
      >
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
              <TableCell>Direccion</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow
                key={cliente._id}
                onClick={() => handleVerCliente(cliente)}
                sx={{
                  cursor: "pointer",
                  "& > *": {
                    maxHeight: "30px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              >
                <TableCell>{cliente.nombre_apellido}</TableCell>
                <TableCell>{cliente.dni}</TableCell>
                <TableCell>{cliente.num_telefono}</TableCell>
                <TableCell>{cliente.distrito}</TableCell>
                <TableCell>{cliente.referencia}</TableCell>
                <TableCell>{cliente.comentario}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="editar"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(cliente._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="eliminar"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(cliente._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
      <ClienteDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleSubmit={handleSubmitDialog}
        formData={cliente}
        handleInputChange={handleInputChange}
      />
      <VerClienteDialog
        open={verClienteDialogOpen}
        handleClose={handleCloseVerClienteDialog}
        cliente={clienteSeleccionado}
      />
    </Box>
  );
};

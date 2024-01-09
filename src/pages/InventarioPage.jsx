import React, { useState, useEffect } from "react";
import { useInventario } from "../context/inventarioContext.jsx";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";
import CreateAccesorioDialog from "../components/InventarioDialog.jsx";
import { useAuth } from "../context/authContext";

export const InventarioPage = () => {
  const {
    accesorios,
    currentPage,
    totalPages,
    loading,
    getAllAccesorios,
    deleteAccesorio,
    handleSetCurrentPage,
    createAccesorio,
    updateAccesorio,
  } = useInventario();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAccesorio, setEditingAccesorio] = useState({
    nombre: "",
    stock: "",
    descripcion: "",
    categoria: "",
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDialogOpen = (accesorioData) => {
    if (accesorioData && accesorioData._id) {
      setEditingAccesorio(accesorioData);
    }
    setDialogOpen(true);
  };
  const handleEdit = (accesorioId) => {
    const accesorioSeleccionado = accesorios.find(
      (accesorio) => accesorio._id === accesorioId
    );
    handleDialogOpen(accesorioSeleccionado);
  };

  const handleCloseDialog = () => {
    setEditingAccesorio({
      nombre: "",
      stock: "",
      descripcion: "",
      categoria: "",
    });
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAccesorio({
      ...editingAccesorio,
      [name]: value,
    });
  };

  const handleDelete = async (accesorioId) => {
    try {
      await deleteAccesorio(accesorioId);
      getAllAccesorios(currentPage);
    } catch (error) {
      console.error("Error al eliminar el Accesorio:", error);
    }
  };

  const handleSubmitDialog = (formData) => {
    if (editingAccesorio && editingAccesorio._id) {
      updateAccesorio(editingAccesorio._id, formData);
    } else {
      createAccesorio(formData, currentPage);
    }
  };

  useEffect(() => {
    getAllAccesorios(currentPage);
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
          Inventario
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Agregar Accesorio
        </Button>
      </Box>

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
              <TableCell>Stock</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Número Vendidos</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accesorios.map((accesorio) => (
              <TableRow key={accesorio._id}>
                <TableCell>{accesorio.nombre}</TableCell>
                <TableCell>{accesorio.stock}</TableCell>
                <TableCell>{accesorio.descripcion}</TableCell>
                <TableCell>{accesorio.num_vendidos}</TableCell>
                <TableCell>{accesorio.categoria}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="editar"
                    onClick={() => handleEdit(accesorio._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="eliminar"
                    onClick={() => handleDelete(accesorio._id)}
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
          count={totalPages}
          page={currentPage}
          onChange={handleSetCurrentPage}
        />
      </Box>

      <CreateAccesorioDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleSubmit={handleSubmitDialog}
        formData={editingAccesorio}
        handleInputChange={handleInputChange}
      />
    </Box>
  );
};

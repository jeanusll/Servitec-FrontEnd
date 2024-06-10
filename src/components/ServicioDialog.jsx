// Componente para el diálogo de creación de servicio
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import { ServicioForm } from "../components/forms/ServicioForm.jsx";

import { useProgramar } from "../context/ProgramarContext.jsx";

export const ServicioDialog = ({ open, onClose, onAddService }) => {
  const { nuevoServicio, setNuevoServicio } = useProgramar();
  const [error, setError] = useState({ mensaje: "", error: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio({
      ...nuevoServicio,
      [name]: value,
    });
  };

  const checkService = () => {
    for (const key in nuevoServicio) {
      if (nuevoServicio[key] === "" && key !== "comentario") {
        setError({
          mensaje: "El campo " + key + " es obligatorio",
          error: true,
        });
        return false;
      }
    }
    return true;
  };
  const handleCloseSnackbar = (event, reason) => {
    setError({ mensaje: "", error: false });
  };

  const handleAddService = () => {
    if (!checkService()) {
      return;
    } else {
      onAddService(nuevoServicio);
      setNuevoServicio({
        numero_llamada: "",
        tienda: nuevoServicio.tienda,
        marca: nuevoServicio.marca,
        producto: "",
        fecha_visita: nuevoServicio.fecha_visita,
        tipo_servicio: nuevoServicio.tipo_servicio,
        turno: nuevoServicio.turno,
        color: nuevoServicio.color,
      });
      onClose();
    }
  };

  const handleClose = () => {
    setError({ mensaje: "", error: false });
    setNuevoServicio({
      numero_llamada: "",
      tienda: "",
      marca: "",
      producto: "",
      fecha_visita: "",
      tipo_servicio: "",
      color: "",
      turno: "T/D",
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Nuevo Servicio</DialogTitle>
      <DialogContent>
        <ServicioForm
          formData={nuevoServicio}
          handleInputChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleAddService} variant="contained">
          Agregar Servicio
        </Button>
      </DialogActions>
      <Snackbar
        open={error.error}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {error.mensaje}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

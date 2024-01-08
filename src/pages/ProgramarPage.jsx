import React, { useEffect, useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import { CrearCliente } from "../components/steps/CrearCliente.jsx";
import { CrearServicio } from "../components/steps/CrearServicio.jsx";
import { ConfirmarDatos } from "../components/steps/ConfirmarDatos.jsx";
import { ServiciosAcordeon } from "../components/ServiciosAcordeon.jsx";
import { programarRequest } from "../api/programar.js";
import { SuccessDialog } from "../components/SuccessProgramacionDialog.jsx";

import { useProgramar } from "../context/ProgramarContext.jsx";

export const ProgramarPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    cliente: {
      _id: "",
      nombre_apellido: "",
      dni: "",
      num_telefono: "",
      distrito: "",
      direccion: "",
      referencia: "",
      comentario: "",
    },
    servicios: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [succesProgramacion, setSuccessProgramacion] = useState(false);

  const handleCloseDialogProgramacion = () => {
    setSuccessProgramacion(false);
  };

  const isClienteValid = () => {
    for (const key in formData.cliente) {
      if (
        key !== "dni" &&
        key !== "comentario" &&
        key !== "_id" &&
        formData.cliente[key] === ""
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleAddService = (newService) => {
    setFormData({
      ...formData,
      servicios: [...formData.servicios, newService],
    });
  };

  const handleInputChangeClient = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      cliente: {
        ...prevFormData.cliente,
        [name]: value,
      },
    }));
  };

  const handleSelectCliente = (cliente) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cliente,
    }));
  };

  const handleNext = async () => {
    if (activeStep === 0 && !isClienteValid()) {
      setSnackbarOpen(true);
      return;
    }

    if (activeStep === 1 && formData.servicios.length === 0) {
      setSnackbarOpen(true);
      return;
    }

    if (activeStep === 2) {
      try {
        await programarRequest(formData);
        setSuccessProgramacion(true);
      } catch (e) {
        setSnackbarOpen(true);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CrearCliente
            formData={formData.cliente}
            handleInputChange={handleInputChangeClient}
            handleSelectCliente={handleSelectCliente}
          />
        );
      case 1:
        return (
          <Box sx={{ width: "100%" }}>
            <ServiciosAcordeon servicios={formData.servicios} />
            <CrearServicio onAddService={handleAddService} />
          </Box>
        );
      case 2:
        return (
          <Box>
            <ConfirmarDatos
              cliente={formData.cliente}
              servicios={formData.servicios}
            />
          </Box>
        );
      default:
        return "Paso desconocido";
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={"85vh"}
    >
      <Box
        width="70%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Crear Cliente">
            <StepLabel>Crear o buscar un Cliente</StepLabel>
          </Step>
          <Step key="Crear Servicio">
            <StepLabel>Crear Servicio/s</StepLabel>
          </Step>
          <Step key="Confirmar Datos">
            <StepLabel>Confirmar Datos</StepLabel>
          </Step>
        </Stepper>
        <Box width="100%" maxHeight="80vh" mt={2}>
          {getStepContent(activeStep)}
          <Box display="flex" justifyContent="space-between" mt={2}>
            {activeStep !== 0 && <Button onClick={handleBack}>Regresar</Button>}
            <Button variant="contained" onClick={handleNext}>
              {activeStep === 2 ? "Confirmar" : "Siguiente"}
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {activeStep === 0 ? (
              <>
                Por favor complete todos los campos requeridos o seleccione un
                cliente
              </>
            ) : activeStep === 1 ? (
              <>Por favor agregue al menos un servicio</>
            ) : (
              <>Hubo un error al realizar la programacion</>
            )}
          </Alert>
        </Snackbar>
        <SuccessDialog
          open={succesProgramacion}
          onClose={handleCloseDialogProgramacion}
        />
      </Box>
    </Box>
  );
};

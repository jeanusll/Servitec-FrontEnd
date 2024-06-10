import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { CrearCliente } from "./steps/CrearCliente";
import { useState } from "react";
import { AccesorioVenta } from "./steps/AccesorioVenta";
import { ConfirmarDatosVenta } from "./ConfirmarDatosVenta";

export const VentaDialog = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  setCliente,
  addAccesorio,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStep = (step) => {
    switch (step) {
      case 0:
        return (
          <CrearCliente
            formData={formData.cliente}
            handleInputChange={handleInputChange}
            handleSelectCliente={setCliente}
          ></CrearCliente>
        );
      case 1:
        return (
          <AccesorioVenta
            formData={formData.accesorios}
            addAccesorio={addAccesorio}
          ></AccesorioVenta>
        );
      case 2:
        return (
          <ConfirmarDatosVenta
            cliente={formData.cliente}
            accesorios={formData.accesorios}
          ></ConfirmarDatosVenta>
        );
    }
  };
  const handleNext = async () => {
    if (activeStep < 2) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCloseDialog = () => {
    handleClose();
    setActiveStep(0);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl">
      <DialogTitle>Nueva venta</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Crear Cliente">
            <StepLabel>Crear o buscar un Cliente</StepLabel>
          </Step>
          <Step key="Agregar Accesorios">
            <StepLabel>Agregar Acesorio/s</StepLabel>
          </Step>
          <Step key="Confirmar Datos">
            <StepLabel>Confirmar Datos</StepLabel>
          </Step>
        </Stepper>
        <Box style={{ width: "110vh" }} mt={2}>
          {getStep(activeStep)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" mt={2}>
          {activeStep !== 0 && <Button onClick={handleBack}>Regresar</Button>}
          <Button variant="contained" onClick={handleNext}>
            {activeStep === 2 ? "Confirmar" : "Siguiente"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

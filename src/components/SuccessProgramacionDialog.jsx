import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useProgramar } from "../context/ProgramarContext";

export const SuccessDialog = ({ open, onClose }) => {
  const { setNuevoServicio } = useProgramar();

  const navigate = useNavigate();

  const handleRealizarOtraProgramacion = () => {
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
    window.location.reload();
    onClose();
  };

  const handleIrAlMenuPrincipal = () => {
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
    navigate("/hoja-trabajo");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <CheckCircleIcon color="success" fontSize="large" />
        <Typography variant="h6">Felicidades</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          La programación se ha realizado correctamente.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleRealizarOtraProgramacion}
          color="primary"
          startIcon={<ReplayIcon />}
        >
          Realizar otra programación
        </Button>
        <Button
          onClick={handleIrAlMenuPrincipal}
          color="primary"
          startIcon={<HomeIcon />}
        >
          Ir a la hoja de trabajo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

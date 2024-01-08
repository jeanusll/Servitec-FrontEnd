import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { ClienteForm } from "./forms/ClienteForm.jsx";
const ClienteDialog = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleInputChange,
}) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (formData && formData._id) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [open]);

  const handleSubmitForm = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editing ? "Editar Cliente" : "Crear Cliente"}</DialogTitle>
      <DialogContent>
        <ClienteForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editing={editing}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmitForm} variant="contained" color="primary">
          {!editing ? "Crear" : "Guardar cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClienteDialog;

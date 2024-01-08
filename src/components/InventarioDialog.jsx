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

const AccesorioDialog = ({
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
      <DialogTitle>Crear Accesorio</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={formData.nombre}
              name="nombre"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stock"
              fullWidth
              margin="normal"
              value={formData.stock}
              name="stock"
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Categoria"
              fullWidth
              margin="normal"
              value={formData.categoria}
              name="categoria"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.descripcion}
              name="descripcion"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          ></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmitForm} variant="contained" color="primary">
          {editing ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccesorioDialog;

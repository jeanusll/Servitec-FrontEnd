import React, { useEffect } from "react";
import { TextField, Grid } from "@mui/material";

export const ClienteForm = ({ formData, handleInputChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={formData.nombre_apellido}
          name="nombre_apellido"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Teléfono"
          fullWidth
          margin="normal"
          value={formData.num_telefono}
          name="num_telefono"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Distrito"
          fullWidth
          margin="normal"
          value={formData.distrito}
          name="distrito"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Dirección"
          fullWidth
          margin="normal"
          value={formData.direccion}
          name="direccion"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Referencia"
          fullWidth
          margin="normal"
          value={formData.referencia}
          name="referencia"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Comentario (opcional)"
          fullWidth
          margin="normal"
          value={formData.comentario}
          name="comentario"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="DNI (opcional)"
          fullWidth
          margin="normal"
          value={formData.dni}
          name="dni"
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
};

import React from "react";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export const ServicioForm = ({ formData, handleInputChange }) => {
  const coloresPredefinidos = [
    { nombre: "NORMAL", codigo: "WHITE" },
    { nombre: "REPUESTO", codigo: "PINK" },
    { nombre: "COBRAR", codigo: "GRAY" },
    { nombre: "TRANSPORTE", codigo: "BLUE" },
    { nombre: "URGENTE", codigo: "YELLOW" },
    { nombre: "POSTERGADO", codigo: "ORANGE" },
    { nombre: "RECLAMO", codigo: "RED" },
    { nombre: "VENTA", codigo: "PURPLE" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Numero de Llamada"
          fullWidth
          margin="normal"
          value={formData.numero_llamada}
          name="numero_llamada"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Tienda"
          fullWidth
          margin="normal"
          value={formData.tienda}
          name="tienda"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Marca"
          fullWidth
          margin="normal"
          value={formData.marca}
          name="marca"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Producto"
          fullWidth
          margin="normal"
          value={formData.producto}
          name="producto"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Fecha Visita"
          fullWidth
          margin="normal"
          value={formData.fecha_visita}
          name="fecha_visita"
          onChange={handleInputChange}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Tipo Servicio"
          fullWidth
          margin="normal"
          value={formData.tipo_servicio}
          name="tipo_servicio"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Color</InputLabel>
          <Select
            value={formData.color}
            onChange={handleInputChange}
            name="color"
            label="Color"
            sx={{ backgroundColor: formData.color }}
          >
            {coloresPredefinidos.map((color, index) => (
              <MenuItem
                key={index}
                value={color.codigo}
                style={{ backgroundColor: color.codigo }}
              >
                {color.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl component="fieldset">
          <legend>Turno</legend>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.turno === "T/M"}
                  onChange={handleInputChange}
                  name="turno"
                  value="T/M"
                />
              }
              label="Mañana"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.turno === "T/T"}
                  onChange={handleInputChange}
                  name="turno"
                  value="T/T"
                />
              }
              label="Tarde"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.turno === "T/D"}
                  onChange={handleInputChange}
                  name="turno"
                  value="T/D"
                />
              }
              label="Todo el Día"
            />
          </Box>
        </FormControl>
      </Grid>
      <Box width={"100%"} ml={2}>
        <TextField
          multiline
          rows={4}
          label="Comentario"
          fullWidth
          margin="normal"
          value={formData.comentario}
          name="comentario"
          onChange={handleInputChange}
        />
      </Box>
    </Grid>
  );
};

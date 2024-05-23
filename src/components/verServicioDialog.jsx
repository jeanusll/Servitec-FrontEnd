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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

dayjs.extend(utc);
dayjs.locale("es");
dayjs.extend(localeData);

export const VerServicioDialog = ({
  open,
  handleClose,
  servicio,
  handleInputChange,
  handleSaveService,
}) => {
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Nuevo Servicio</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Numero de Llamada"
              fullWidth
              margin="normal"
              value={servicio.numero_llamada}
              name="numero_llamada"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tienda"
              fullWidth
              margin="normal"
              value={servicio.tienda}
              name="tienda"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Marca"
              fullWidth
              margin="normal"
              value={servicio.marca}
              name="marca"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Producto"
              fullWidth
              margin="normal"
              value={servicio.producto}
              name="producto"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Fecha Visita"
              fullWidth
              margin="normal"
              value={dayjs(servicio.fecha_visita).utc().format("YYYY-MM-DD")}
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
              value={servicio.tipo_servicio}
              name="tipo_servicio"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              label="Estado Realizado"
              control={
                <Checkbox
                  checked={servicio.estado_realizado}
                  onChange={() =>
                    handleInputChange({
                      target: {
                        name: "estado_realizado",
                        value: !servicio.estado_realizado,
                      },
                    })
                  }
                  name="estado_realizado"
                  icon={<CloseIcon />}
                  checkedIcon={<CheckIcon />}
                />
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                value={servicio.color}
                onChange={handleInputChange}
                name="color"
                label="Color"
                sx={{ backgroundColor: servicio.color }}
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
                      checked={servicio.turno === "T/M"}
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
                      checked={servicio.turno === "T/T"}
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
                      checked={servicio.turno === "T/D"}
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
              value={servicio.comentario}
              name="comentario"
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSaveService} variant="contained">
          Guardar Edicion
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

export const VerClienteDialog = ({ open, handleClose, cliente }) => {
  if (!cliente) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6">Cliente: {cliente.nombre_apellido}</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <b>Teléfono:</b> {cliente.num_telefono}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Distrito:</b> {cliente.distrito}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Dirección:</b> {cliente.direccion}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <b>Referencia:</b> {cliente.referencia}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>DNI:</b> {cliente.dni}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Comentario:</b> {cliente.comentario}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {cliente.hist_servicios.map((servicio, index) => (
              <Accordion
                key={index}
                sx={{
                  borderLeft: servicio.estado_realizado
                    ? "4px solid green"
                    : "4px solid red",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {servicio.producto} - ({servicio.tipo_servicio})
                    </Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                      <Typography variant="subtitle2">
                        {dayjs(servicio.fecha_visita)
                          .utc()
                          .format("DD/MM/YYYY")}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        <b>Numero de Llamada:</b> {servicio.numero_llamada}
                        <br />
                        <b>Tienda:</b> {servicio.tienda}
                        <br />
                        <b>Marca:</b> {servicio.marca}
                        <br />
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">
                        <b>Turno:</b> {servicio.turno}
                        <br />
                        <b>Comentario:</b> {servicio.comentario}
                        <br />
                        <b>Encargado:</b> {servicio.encargado}
                        <br />
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

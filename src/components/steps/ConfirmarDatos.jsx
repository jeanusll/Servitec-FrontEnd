import React from "react";
import {
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";

export const ConfirmarDatos = ({ cliente, servicios }) => {
  return (
    <div>
      <Typography variant="h6">Confirmar Datos</Typography>
      <Box mt={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">Datos del Cliente:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Nombre y Apellido:`}</Typography>
                <Typography>{`${cliente.nombre_apellido}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Numero de Telefono:`}</Typography>
                <Typography>{`${cliente.num_telefono}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Distrito:`}</Typography>
                <Typography>{`${cliente.distrito}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Comentario:`}</Typography>
                <Typography>{`${cliente.comentario}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Dirección:`}</Typography>
                <Typography>{`${cliente.direccion}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`Referencia:`}</Typography>
                <Typography>{`${cliente.referencia}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography sx={{ fontWeight: "bold" }}>{`DNI:`}</Typography>
                <Typography>{`${cliente.dni}`}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Divider style={{ margin: "20px 0" }} />
      <Box>
        <Typography variant="subtitle1">Detalles de los Servicios:</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Servicio</TableCell>
                <TableCell>Número de Llamada</TableCell>
                <TableCell>Tienda</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Turno</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicios.map((servicio, index) => (
                <TableRow key={index}>
                  <TableCell>{`Servicio ${index + 1}`}</TableCell>
                  <TableCell>{servicio.numero_llamada}</TableCell>
                  <TableCell>{servicio.tienda}</TableCell>
                  <TableCell>{servicio.turno}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

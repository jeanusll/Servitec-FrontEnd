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

export const ConfirmarDatosVenta = ({ cliente, accesorios }) => {
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
        <Typography variant="subtitle1">Detalles de los Productos:</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accesorios.map((accesorio, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{accesorio.nombre}</TableCell>
                  <TableCell>{accesorio.precio}</TableCell>
                  <TableCell>{accesorio.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

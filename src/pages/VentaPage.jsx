import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { VentaDialog } from "../components/VentaDialog";

export const VentaPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [venta, setVenta] = useState({
    cliente: {
      _id: "",
      nombre_apellido: "",
      dni: "",
      num_telefono: "",
      distrito: "",
      direccion: "",
      referencia: "",
      comentario: "",
    },
    accesorios: [],
  });
  const handleDialogOpen = (event) => {
    setDialogOpen(true);
  };

  const handleDialogClose = (event) => {
    setVenta({
      cliente: "",
      accesorios: [],
    });

    setDialogOpen(false);
  };

  const setCliente = (cliente) => {
    setVenta((prevFormData) => ({
      ...prevFormData,
      cliente,
    }));
  };

  const addAccesorio = (accesorio) => {
    setVenta((prevVenta) => ({
      ...prevVenta,
      accesorios: [...prevVenta.accesorios, accesorio],
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setVenta((prevVenta) => ({
      ...prevVenta,
      cliente: {
        ...prevVenta.cliente,
        [name]: value,
      },
    }));
  };

  return (
    <Box mt={4} mx="auto" maxWidth={"80%"}>
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        justifyContent="space-between"
      >
        <Typography variant="h1" component="div">
          Ventas
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Nueva venta
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numero de Ticket</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <VentaDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        formData={venta}
        handleInputChange={handleInputChange}
        setCliente={setCliente}
        addAccesorio={addAccesorio}
      ></VentaDialog>
    </Box>
  );
};

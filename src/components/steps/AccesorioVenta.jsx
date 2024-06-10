import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Autocomplete,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useInventario } from "../../context/inventarioContext";

export const AccesorioVenta = ({ formData, addAccesorio }) => {
  const { accesorios, currentPage, getAllAccesorios } = useInventario();
  const [arrAccesorios, setArrAccesorios] = useState([]);
  const [accesorio, setAccesorio] = useState({
    _id: "",
    nombre: "",
    precio: "",
    cantidad: "",
    stock: "",
  });

  useEffect(() => {
    getAllAccesorios(currentPage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccesorio((prevAccesorio) => ({
      ...prevAccesorio,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setAccesorio({
        _id: newValue._id,
        nombre: newValue.nombre,
        precio: newValue.precio,
        stock: newValue.stock,
        cantidad: 0,
      });
    } else {
      setAccesorio({
        _id: "",
        nombre: "",
        precio: "",
        cantidad: "",
        stock: "",
      });
    }
  };

  const handleAddAccesorio = () => {
    if (accesorio.cantidad !== 0) {
      addAccesorio(accesorio);
      setArrAccesorios((prev) => [...prev, accesorio]);
    }
  };

  return (
    <Box>
      <TableContainer sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((accesorio, i) => (
              <TableRow key={i}>
                <TableCell>{accesorio.nombre}</TableCell>
                <TableCell sx={{ width: "80px" }}>{accesorio.precio}</TableCell>
                <TableCell sx={{ width: "80px" }}>{accesorio.stock}</TableCell>
                <TableCell sx={{ width: "80px" }}>
                  {accesorio.cantidad}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="editar"
                    onClick={() => console.log("editando")}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="eliminar"
                    onClick={() => console.log("eliminando")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={accesorios}
            getOptionLabel={(option) => option.nombre}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField {...params} label="Nombre" fullWidth margin="normal" />
            )}
            value={
              accesorios.find((item) => item._id === accesorio._id) || null
            }
            onChange={handleAutocompleteChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Precio"
            fullWidth
            margin="normal"
            name="precio"
            value={accesorio.precio}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            name="stock"
            value={accesorio.stock}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Cantidad a Vender"
            fullWidth
            margin="normal"
            name="cantidad"
            value={accesorio.cantidad}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleAddAccesorio}
            sx={{ mt: 2 }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      {formData.length === 0 && <p>Agregue accesorios para la venta</p>}
    </Box>
  );
};

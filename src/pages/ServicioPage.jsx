import React, { useEffect, useState } from "react";
import { useServicios } from "../context/ServicioContext";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

dayjs.extend(utc);
dayjs.locale("es");
dayjs.extend(localeData);
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import { VerServicioDialog } from "../components/verServicioDialog";
export const ServicioPage = () => {
  const {
    servicios,
    currentPage,
    totalPages,
    loading,
    getAllServicios,
    setCurrentPage,
    findServicio,
    updateServicio,
    deleteServicio,
  } = useServicios();
  const { isAuthenticated } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFinding, setIsFinding] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [servicioEditing, setServicioEditing] = useState({
    _id: "",
    numero_llamada: "",
    tienda: "",
    marca: "",
    producto: "",
    fecha_visita: "",
    tipo_servicio: "",
    color: "",
    turno: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllServicios(currentPage);
  }, []);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFindServicio = async () => {
    setIsFinding(true);
    await findServicio(searchTerm, 1);
  };

  const handleViewAll = () => {
    getAllServicios(1);
    setSearchTerm("");
    setIsFinding(false);
  };

  const handleSetCurrentPage = async (event, page) => {
    if (isFinding) {
      findServicio(searchTerm, page);
    } else {
      setCurrentPage(page);
    }
  };

  const handleEliminarServicio = async (id) => {
    await deleteServicio(id);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setServicioEditing({
      ...servicioEditing,
      [name]: value,
    });
  };

  const handleEditarServicio = async (servicio) => {
    setServicioEditing(servicio);
    setOpenDialogEdit(true);
  };
  const handleCloseEditarServicio = () => {
    setOpenDialogEdit(false);
    setServicioEditing({
      numero_llamada: "",
      tienda: "",
      marca: "",
      producto: "",
      fecha_visita: "",
      tipo_servicio: "",
      color: "",
      turno: "",
      _id: "",
    });
  };
  const handleSaveService = () => {
    updateServicio(servicioEditing);
    handleCloseEditarServicio();
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
          Servicios
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          marginRight: 0,
          paddingRight: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={8}>
          <TextField
            label="Buscar por nombre, DNI o teléfono"
            margin="normal"
            fullWidth
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Grid>
        <Grid item xs={6} sm={2} sx={{ textAlign: "center" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleFindServicio}
            sx={{ marginLeft: "8px" }}
          >
            <SearchIcon />
            Buscar Cliente
          </Button>
        </Grid>
        <Grid item xs={6} sm={2} sx={{ textAlign: "center", padding: 0 }}>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleViewAll}
            sx={{ marginLeft: "8px", marginRight: "0px" }}
          >
            <VisibilityIcon />
            Mostrar todos
          </Button>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {" "}
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableCell>Cliente</TableCell>
              <TableCell>Número de Llamada</TableCell>
              <TableCell>Tienda</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Fecha de Visita</TableCell>
              <TableCell>Tipo de Servicio</TableCell>
              <TableCell>Turno</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.length > 0 &&
              servicios.map((servicio) => (
                <TableRow
                  key={servicio._id}
                  sx={{
                    borderLeftColor: servicio.estado_realizado
                      ? "green"
                      : "red",
                    borderLeftWidth: 4,
                    borderLeftStyle: "solid",
                  }}
                >
                  <TableCell>{servicio.cliente.nombre_apellido}</TableCell>
                  <TableCell>{servicio.numero_llamada}</TableCell>
                  <TableCell>{servicio.tienda}</TableCell>
                  <TableCell>{servicio.producto}</TableCell>
                  <TableCell>
                    {dayjs(servicio.fecha_visita).utc().format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{servicio.tipo_servicio}</TableCell>

                  <TableCell>{servicio.turno}</TableCell>
                  <TableCell>{servicio.comentario}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="editar"
                      onClick={() => handleEditarServicio(servicio)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="editar"
                      onClick={() => handleEliminarServicio(servicio._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={parseInt(totalPages)}
          page={parseInt(currentPage)}
          onChange={handleSetCurrentPage}
        />
      </Box>

      {openDialogEdit && (
        <VerServicioDialog
          open={openDialogEdit}
          servicio={servicioEditing}
          handleInputChange={handleInputChange}
          handleClose={handleCloseEditarServicio}
          handleSaveService={handleSaveService}
        />
      )}
    </Box>
  );
};

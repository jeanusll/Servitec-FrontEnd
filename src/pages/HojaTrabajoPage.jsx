import React, { useEffect, useState } from "react";
import { useHojaTrabajo } from "../context/HojaTrabajoContext";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import TodayIcon from "@mui/icons-material/Today";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.locale("es");
dayjs.extend(localeData);
dayjs.utc(-5);
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CalendarDialog } from "../components/CalendarDialog.jsx";
import { useAuth } from "../context/authContext";
import { VerServicioDialog } from "../components/verServicioDialog.jsx";
import { useServicios } from "../context/ServicioContext.jsx";

export const HojaTrabajoPage = () => {
  const {
    servicios,
    getHojaTrabajo,
    downloadHojaTrabajo,
    checkServicio,
    totalServicios,
    day,
    setDay,
    reprogramarServicio,
  } = useHojaTrabajo();
  useEffect(() => {
    getHojaTrabajo(day);
  }, [day]);

  const handleDownload = () => {
    downloadHojaTrabajo(day);
  };

  const handleReturn = () => {
    setDay(dayjs(new Date()).format("YYYY-MM-DD"));
  };

  const handleTomorrow = () => {
    const tomorrow = dayjs(new Date()).add(1, "day");

    if (tomorrow.day() === 0) {
      setDay(tomorrow.add(1, "day").format("YYYY-MM-DD"));
    } else {
      setDay(tomorrow.format("YYYY-MM-DD"));
    }
  };

  const handleCheckServicio = (id) => {
    checkServicio(id);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const [openDialogReprogramar, setOpenDialogReprogramar] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { updateServicio } = useServicios();

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialogReprogramar(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogReprogramar(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(dayjs(event.target.value).format("YYYY-MM-DD"));
  };

  const handleReprogramar = () => {
    reprogramarServicio(selectedId, selectedDate);
    handleCloseDialog();
  };

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
    getHojaTrabajo(day);
    handleCloseEditarServicio();
  };
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredServicios, setFilteredServicios] = useState([]);

  useEffect(() => {
    setFilteredServicios(servicios);
  }, [servicios]);

  const handleChangeSearchTerm = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = servicios.filter(
      (servicio) =>
        servicio.numero_llamada.toLowerCase().includes(searchTerm) ||
        servicio.cliente.nombre_apellido.toLowerCase().includes(searchTerm) ||
        servicio.cliente.distrito.toLowerCase().includes(searchTerm) ||
        servicio.cliente.num_telefono.toLowerCase().includes(searchTerm)
    );
    setFilteredServicios(filtered);
    setSearchTerm(searchTerm);
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
          Hoja de trabajo
        </Typography>
        <Typography variant="h2" component="div">
          {day}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        justifyContent="space-between"
        mb={2}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Buscar por fecha"
            margin="normal"
            value={day}
            name="Fecha"
            type="date"
            onChange={handleDayChange}
            sx={{ width: 300 }}
          />
          {dayjs(new Date()).format("YYYY-MM-DD") != day ? (
            <Button
              startIcon={<TodayIcon />}
              variant="contained"
              color="success"
              sx={{ ml: 2 }}
              onClick={handleReturn}
            >
              Hoy
            </Button>
          ) : (
            <Button
              startIcon={<TodayIcon />}
              variant="contained"
              color="success"
              sx={{ ml: 2 }}
              onClick={handleTomorrow}
            >
              Siguiente Programacion
            </Button>
          )}
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleDownload}
          >
            Descargar
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div">
            {servicios.length == 0
              ? "No hay servicios programados para este día"
              : "En total son: " + totalServicios + " servicios"}
          </Typography>
          <p style={{ fontWeight: "bold", marginTop: 0 }}>
            *Se cuentan ya agrupados*
          </p>
        </Box>
      </Box>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Buscar por Nombre de cliente, Número de llamada, Número de telefono o distrito"
          margin="normal"
          fullWidth
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Grid>
      <Box sx={{ display: "flex", alignItems: "center" }}></Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              }}
            >
              <TableCell>Nº de Llamada / Marca</TableCell>
              <TableCell>Descripcción</TableCell>
              <TableCell>Turno</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>¿Reprogramar?</TableCell>
              <TableCell>¿Realizado?</TableCell>
              <TableCell>¿Editar?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServicios.length > 0 &&
              filteredServicios.map((servicio) => (
                <TableRow key={servicio._id}>
                  <TableCell>
                    {servicio.numero_llamada + " / " + servicio.marca}
                  </TableCell>
                  <TableCell>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {servicio.cliente.nombre_apellido}
                    </span>{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {servicio.cliente.num_telefono}
                    </span>{" "}
                    <span style={{ color: "purple", fontWeight: "bold" }}>
                      {servicio.cliente.distrito}
                    </span>{" "}
                    {servicio.cliente.direccion} {servicio.cliente.referencia} -{" "}
                    {servicio.producto} ({servicio.tipo_servicio}){" "}
                    <span
                      style={{
                        color: "red",
                        background: "#FFFF00",
                        fontWeight: "bold",
                      }}
                    >
                      {servicio.comentario}
                    </span>{" "}
                  </TableCell>
                  <TableCell
                    style={{
                      background:
                        servicio.turno === "T/M" || servicio.turno === "T/T"
                          ? "yellow"
                          : "",
                    }}
                  >
                    {servicio.turno}
                  </TableCell>
                  <TableCell sx={{ background: servicio.color }}></TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(servicio._id)}>
                      <CalendarTodayIcon style={{ cursor: "pointer" }} />
                    </IconButton>
                    <CalendarDialog
                      open={
                        openDialogReprogramar && selectedId === servicio._id
                      }
                      onClose={handleCloseDialog}
                      onDateChange={handleDateChange}
                      handleReprogramar={handleReprogramar}
                    />
                  </TableCell>{" "}
                  <TableCell>
                    {servicio.estado_realizado ? (
                      <IconButton>
                        <CheckCircleOutlineIcon
                          color="primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleCheckServicio(servicio._id);
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CancelIcon
                          color="error"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleCheckServicio(servicio._id);
                          }}
                        />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="editar"
                      onClick={() => handleEditarServicio(servicio)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialogEdit && (
        <VerServicioDialog
          open={openDialogEdit}
          servicio={servicioEditing}
          handleInputChange={handleInputChange}
          handleClose={handleCloseEditarServicio}
          handleSaveService={handleSaveService}
        />
      )}{" "}
    </Box>
  );
};

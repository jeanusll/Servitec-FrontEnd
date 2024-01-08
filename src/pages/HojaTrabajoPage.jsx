import React, { useEffect, useState } from "react";
import { useHojaTrabajo } from "../context/HojaTrabajoContext";

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
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CalendarDialog } from "../components/CalendarDialog.jsx";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(dayjs(event.target.value).format("YYYY-MM-DD"));
  };

  const handleReprogramar = () => {
    reprogramarServicio(selectedId, selectedDate);
    handleCloseDialog();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.length > 0 &&
              servicios.map((servicio) => (
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
                  <TableCell>{servicio.turno}</TableCell>
                  <TableCell sx={{ background: servicio.color }}></TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(servicio._id)}>
                      <CalendarTodayIcon style={{ cursor: "pointer" }} />
                    </IconButton>
                    <CalendarDialog
                      open={openDialog && selectedId === servicio._id}
                      onClose={handleCloseDialog}
                      onDateChange={handleDateChange}
                      handleReprogramar={handleReprogramar}
                    />
                  </TableCell>{" "}
                  <TableCell>
                    {servicio.estado_realizado ? (
                      <CheckCircleOutlineIcon
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCheckServicio(servicio._id);
                        }}
                      />
                    ) : (
                      <CancelIcon
                        color="error"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCheckServicio(servicio._id);
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

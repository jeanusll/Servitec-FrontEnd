import React, { useEffect, useState } from "react";
import { ClienteForm } from "../forms/ClienteForm.jsx";
import { BuscarCliente } from "./BuscarCliente.jsx";
import { Grid, Button } from "@mui/material";

export const CrearCliente = ({
  formData,
  handleInputChange,
  handleSelectCliente,
}) => {
  const [mostrarCrear, setMostrarCrear] = useState(true);

  const mostrarComponente = (crear) => {
    setMostrarCrear(crear);
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          variant={mostrarCrear ? "contained" : "outlined"}
          color="primary"
          onClick={() => mostrarComponente(true)}
        >
          Crear Cliente
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant={!mostrarCrear ? "contained" : "outlined"}
          color="primary"
          onClick={() => mostrarComponente(false)}
        >
          Buscar Cliente
        </Button>
      </Grid>
      <Grid item xs={12}>
        {mostrarCrear ? (
          <ClienteForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        ) : (
          <BuscarCliente handleSelectCliente={handleSelectCliente} />
        )}
      </Grid>
    </Grid>
  );
};

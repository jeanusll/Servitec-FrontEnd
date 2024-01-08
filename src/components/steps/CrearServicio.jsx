import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ServicioDialog } from "../ServicioDialog.jsx";
export const CrearServicio = ({ onAddService }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        color="success"
      >
        Agregar Servicio
      </Button>
      <ServicioDialog
        onAddService={onAddService}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
};

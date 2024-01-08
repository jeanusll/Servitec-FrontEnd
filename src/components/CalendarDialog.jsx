import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export const CalendarDialog = ({
  open,
  onClose,
  onDateChange,
  handleReprogramar,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Seleccione una fecha</DialogTitle>
      <DialogContent
        sx={{ display: "flex", alignItems: "center", width: "40vh" }}
      >
        <TextField
          label="Fecha Visita"
          fullWidth
          margin="normal"
          name="fecha_visita"
          onChange={onDateChange}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          sx={{ marginLeft: "5px" }}
          fullWidth
          variant="contained"
          onClick={handleReprogramar}
        >
          Reprogramar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

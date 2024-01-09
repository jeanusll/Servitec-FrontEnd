import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/authContext";

export const RegisterPage = () => {
  const { signup, errors, loading, isAuthenticated } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    await signup(userData);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Registro
          </Typography>
        </Box>
        {errors.length > 0 && (
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography key={1} variant="body2" color="error">
              {errors}
            </Typography>
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "50%" }}
              disabled={loading}
            >
              Registrarse
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

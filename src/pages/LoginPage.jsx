import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
import { useEffect } from "react";

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";

export const LoginPage = () => {
  const { signin, isAuthenticated, errors } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/clientes");
    }
  }, [isAuthenticated]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signin(user);
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
            Iniciar Sesión
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
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "50%" }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

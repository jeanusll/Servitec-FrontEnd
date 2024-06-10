import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/authContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const styles = {
    appBar: {
      backgroundColor: "#fff",
      boxShadow: "none",
      maxWidth: "70%",
      margin: "0 auto",
    },
    link: {
      textDecoration: "none",
      color: "#333",
      marginRight: "20px",
    },
    typography: {
      flexGrow: 1,
      color: "#333",
    },
  };

  return (
    isAuthenticated && (
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" style={styles.typography}>
            Servitec Lucio
          </Typography>
          <Button
            component={Link}
            to="/programar"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Programar
          </Button>
          <Link to="/accesorios" style={styles.link}>
            Inventario
          </Link>
          <Link to="/clientes" style={styles.link}>
            Clientes
          </Link>
          <Link to="/ventas" style={styles.link}>
            Ventas
          </Link>
          <Link to="/servicios" style={styles.link}>
            Servicios
          </Link>
          <Link to="/hoja-trabajo" style={styles.link}>
            Hoja de Trabajo
          </Link>
          <Link to="/" style={styles.link} onClick={() => logout()}>
            Logout
          </Link>
        </Toolbar>
      </AppBar>
    )
  );
};

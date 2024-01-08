import { createContext, useContext, useEffect, useState } from "react";

const ProgramarContext = createContext();

export const useProgramar = () => {
  const context = useContext(ProgramarContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const ProgramarProvider = ({ children }) => {
  const [nuevoServicio, setNuevoServicio] = useState({
    numero_llamada: "",
    tienda: "",
    marca: "",
    producto: "",
    fecha_visita: "",
    tipo_servicio: "",
    color: "WHITE",
    turno: "T/D",
  });

  return (
    <ProgramarContext.Provider value={{ nuevoServicio, setNuevoServicio }}>
      {children}
    </ProgramarContext.Provider>
  );
};

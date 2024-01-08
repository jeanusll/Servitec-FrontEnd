import { createContext, useContext, useState } from "react";
import { useAuth } from "./authContext.jsx";
import {
  getHojaTrabajoRequest,
  downloadHojaTrabajoRequest,
  checkServicioRequest,
  reprogramarServicioRequest,
} from "../api/hoja_trabajo.js";

import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.locale("es");
dayjs.extend(localeData);
dayjs.utc(-5);

const Hoja_trabajoContext = createContext();

export const useHojaTrabajo = () => {
  const context = useContext(Hoja_trabajoContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const HojaTrabajoProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [totalServicios, setTotalServicios] = useState(0);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const getHojaTrabajo = async (day) => {
    try {
      const res = await getHojaTrabajoRequest(day);
      if (res.status === 200) {
        setServicios(res.data.servicios);
        setTotalServicios(res.data.total);
        setLoading(false);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const reprogramarServicio = async (id, date) => {
    await reprogramarServicioRequest(id, date);
    getHojaTrabajo(day);
  };
  const downloadHojaTrabajo = async (day) => {
    await downloadHojaTrabajoRequest(day);
  };

  const checkServicio = async (id) => {
    try {
      await checkServicioRequest(id);
      await getHojaTrabajo(day);
    } catch (error) {
      setErrors([...errors, error]);
    }
  };

  return (
    <Hoja_trabajoContext.Provider
      value={{
        servicios,
        getHojaTrabajo,
        errors,
        loading,
        downloadHojaTrabajo,
        totalServicios,
        checkServicio,
        day,
        setDay,
        reprogramarServicio,
      }}
    >
      {children}
    </Hoja_trabajoContext.Provider>
  );
};

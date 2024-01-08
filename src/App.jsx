import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventarioProvider } from "./context/inventarioContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { ClienteProvider } from "./context/ClienteContext.jsx";
import { ServicioProvider } from "./context/ServicioContext.jsx";
import { HojaTrabajoProvider } from "./context/HojaTrabajoContext.jsx";
import { ProgramarProvider } from "./context/ProgramarContext.jsx";

import { RegisterPage } from "./pages/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ClientesPage } from "./pages/ClientePage.jsx";
import { ServicioPage } from "./pages/ServicioPage.jsx";
import { InventarioPage } from "./pages/InventarioPage.jsx";
import { HojaTrabajoPage } from "./pages/HojaTrabajoPage.jsx";
import { ProgramarPage } from "./pages/ProgramarPage.jsx";

import { ProtectedRoute } from "./routes.jsx";
import { Navbar } from "./components/Navbar.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <AuthProvider>
      <ClienteProvider>
        <ServicioProvider>
          <BrowserRouter>
            <InventarioProvider>
              <HojaTrabajoProvider>
                <ProgramarProvider>
                  <main>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route element={<ProtectedRoute />}>
                        <Route
                          path="/programar"
                          element={<ProgramarPage />}
                        ></Route>
                        <Route
                          path="/clientes"
                          element={<ClientesPage />}
                        ></Route>
                        <Route
                          path="/servicios"
                          element={<ServicioPage />}
                        ></Route>
                        <Route
                          path="/accesorios"
                          element={<InventarioPage />}
                        ></Route>
                        <Route
                          path="/hoja-trabajo"
                          element={<HojaTrabajoPage />}
                        ></Route>
                      </Route>
                    </Routes>
                  </main>
                </ProgramarProvider>
              </HojaTrabajoProvider>
            </InventarioProvider>
          </BrowserRouter>
        </ServicioProvider>
      </ClienteProvider>
    </AuthProvider>
  );
}

export default App;

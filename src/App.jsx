import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Citas from "./views/Appointments";
import Inventory from "./views/Inventory";
import Patients from "./views/Patients";
import Register from "./views/Register";
import PassRecovery from "./views/PassRecovery";
import PassRestore from "./views/PassRestore";

function App() {
  return (
    <Routes>
      {/* Dashboard routes */}
      <Route path="/citas" element={<Citas />} />
      <Route path="/inventario" element={<Inventory />} />
      <Route path="/pacientes" element={<Patients />} />
      <Route path="/registrarse" element={<Register />} />
      <Route path="/pacientes/:id" element={<Patients />} />
      <Route path="/" element={<Login />} />
      <Route path="/recuperacion-contraseña" element={<PassRecovery />} />
      <Route path="/restablecer-contrasena" element={<PassRestore />} />
      {/* Pacients routes */}
    </Routes>
  );
}

export default App;

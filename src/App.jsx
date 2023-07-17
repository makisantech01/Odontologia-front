import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Citas from "./views/Appointments";
import Inventory from "./views/Inventory";
import Patients from "./views/Patients";
import PatientDetails from "./views/PatientDetails";
import Register from "./views/Register";
import PassRecovery from "./views/PassRecovery";
import PassRestore from "./views/PassRestore";
import { getUserData } from "./components/store/features/usersSlice";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Routes>
      {/* Dashboard routes */}
      <Route path="/citas" element={<Citas />} />
      <Route path="/inventario" element={<Inventory />} />
      <Route path="/registrarse" element={<Register />} />
      <Route path="/pacientes" element={<Patients />} />
      <Route path="/pacientes/:id" element={<PatientDetails />} />
      <Route path="/" element={<Login />} />
      <Route path="/recuperacion-contraseña" element={<PassRecovery />} />
      <Route path="/restablecer-contrasena" element={<PassRestore />} />
      {/* Pacients routes */}
    </Routes>
  );
}

export default App;

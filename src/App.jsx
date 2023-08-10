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
import PacientForm from "./components/Pacients/PacientForm";
import ClinicalHistory from "./components/Pacients/ClinicalHistory";
import PatientData from "./views/PatientData";
import PatientHistory from "./views/PatientHistory";
import Diente from "./views/Diente";
import Odontograma from "./views/Odontograma";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Routes>
      {/* Dashboard routes */}
      <Route path="/" element={<Login />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/inventario" element={<Inventory />} />
      <Route path="/registrarse" element={<Register />} />
      <Route path="/pacientes" element={<Patients />} />
      <Route path="/pacientes/:id" element={<PatientDetails />} />
      <Route path="/recuperacion-contraseña" element={<PassRecovery />} />
      <Route path="/restablecer-contrasena" element={<PassRestore />} />
      <Route path="/datos-personales" element={<PacientForm />} />
      <Route path="/historial-medico" element={<ClinicalHistory />} />
      <Route path="/datos" element={<PatientData />} />
      <Route path="/historial" element={<PatientHistory />} />
      {/* <Route path="/turnos" element={<PatientData />} /> */}
      {/* Pacients routes */}
      <Route path="/diente" element={<Diente />} />
      <Route path="/odontograma" element={<Odontograma />} />

    </Routes>
  );
}

export default App;

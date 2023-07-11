import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Citas from "./views/Citas";
import Inventario from "./components/Inventory/Inventory";
import Pacientes from "./views/Pacientes";
import Register from "./views/Register";

function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/citas" element={<Citas />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

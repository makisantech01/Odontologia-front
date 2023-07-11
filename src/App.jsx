import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Citas from "./views/Citas";
import Asdasd from "./components/Inventory/Inventory";
import Pacientes from "./views/Pacientes";
import Register from "./views/Register";

function App() {
  return (
      <Routes>
        <Route path="/citas" element={<Citas />} />
        <Route path="/inventario" element={<Asdasd />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;

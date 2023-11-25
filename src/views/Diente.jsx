import React from "react";
import DienteForm from "../components/Dientes/DienteForm";
import axios from "axios";

const Diente = () => {
  const url = import.meta.env.VITE_ENDPOINT;
  const handleSubmit = async (data) => {
    try {
      // Primero, verifica si existe un diente con el mismo número
      const existingDienteResponse = await axios.get(
        `${url}/dientes?numero=${data.numero}`
      );

      if (existingDienteResponse.data.length > 0) {
        // Si existe, actualiza ese diente
        const existingDiente = existingDienteResponse.data[0];
        await axios.put(`${url}/dientes/${existingDiente.id}`, data);
      } else {
        // Si no existe, crea un nuevo diente
        await axios.post(`${url}/dientes`, data);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleCancel = () => {
    // Aquí puedes realizar alguna acción cuando se cancele el formulario
    alert("Formulario cancelado");
  };

  return (
    <div class="diente">
      <h1>Crear o editar un Diente</h1>
      <DienteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default Diente;

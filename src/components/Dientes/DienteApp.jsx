import React from "react";
import DienteForm from "./DienteForm";
import axios from "axios";

const DienteApp = () => {
  const handleSubmit = (data) => {
    axios.post("api-sist-odontologico-production-889e.up.railway.app/dientes", data)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });

    // console.log("Datos del formulario que se enviarían:", {
    //   numero,
    //   posicionX,
    //   posicionY,
    //   caras,
    //   todoElDiente,
    //   observacion,
    //   color,
    // });
  };

  const handleCancel = () => {
    console.log("Formulario cancelado");
  };

  return (
    <div>
      <h1>Formulario de Diente</h1>
      <DienteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default DienteApp;

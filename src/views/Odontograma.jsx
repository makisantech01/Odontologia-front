import React, { useState, useEffect } from "react";
import axios from "axios";
import OdontogramComponent from "../components/Odontograma/OdontogramComponent";

const OdontogramaView = () => {
  const [odontograma, setOdontograma] = useState({ dientes: [] });
  const url = import.meta.env.VITE_ENDPOINT;

  useEffect(() => {
    fetchOdontograma();
  }, []);

  const fetchOdontograma = async () => {
    try {
      const response = await axios.get(`${url}/odontogramas`);
      setOdontograma(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Odontograma</h1>
      <p>Paciente: {odontograma?.paciente}</p>
      <p>Fecha: {odontograma?.fecha}</p>
      <p>Observaciones: {odontograma?.observaciones}</p>

      <h2>Dientes:</h2>
      {odontograma?.dientes?.map((diente) => (
        <OdontogramComponent key={diente?.numero} {...diente} />
      ))}
    </div>
  );
};

export default OdontogramaView;

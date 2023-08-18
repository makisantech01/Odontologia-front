import React, { useState, useEffect } from "react";
import axios from "axios";
import OdontogramaDiente from "../components/Odontograma/OdontogramaDiente";

const OdontogramaView = () => {
  const [odontograma, setOdontograma] = useState({ dientes: [] });

  useEffect(() => {
    fetchOdontograma();
  }, []);

  const fetchOdontograma = async () => {
    try {
      const response = await axios.get(
        "https://api-sist-odontologico-production-889e.up.railway.app/odontogramas"
      );
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
        <OdontogramaDiente key={diente?.numero} {...diente} />
      ))}
    </div>
  );
};

export default OdontogramaView;

import React from "react";

const OdontogramaDiente = ({ numero, caras, todoElDiente, observacion }) => {
  return (
    <div>
      <h2>Número de diente: {numero}</h2>
      <p>Caras:</p>
      <ul>
        {caras?.vestibular && <li>Vestibular</li>}
        {caras?.lingual && <li>Lingual</li>}
        {caras?.oclusal && <li>Oclusal</li>}
        {caras?.incisal && <li>Incisal</li>}
        {caras?.mesial && <li>Mesial</li>}
        {caras?.distal && <li>Distal</li>}
        {caras?.cervical && <li>Cervical</li>}
      </ul>
      <p>Todo el diente: {todoElDiente ? "Sí" : "No"}</p>
      <p>Observación: {observacion}</p>
    </div>
  );
};

export default OdontogramaDiente;

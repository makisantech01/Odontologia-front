import React, { useState } from "react";
import Checkbox from "./Checkbox";
import DienteColorPicker from "./DienteColorPicker";

const DienteForm = ({ onSubmit, onCancel }) => {
  const [numero, setNumero] = useState("");
  const [posicionX, setPosicionX] = useState("");
  const [posicionY, setPosicionY] = useState("");
  const [caras, setCaras] = useState({
    vestibular: false,
    lingual: false,
    oclusal: false,
    incisal: false,
    mesial: false,
    distal: false,
    cervical: false,
  });
  const [todoElDiente, setTodoElDiente] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar las validaciones necesarias antes de enviar los datos al componente padre
    onSubmit({
      numero,
      posicionX,
      posicionY,
      caras,
      todoElDiente,
      observacion,
      color,
    });
    // Limpia los campos del formulario después de enviar los datos
    setNumero("");
    setPosicionX("");
    setPosicionY("");
    setCaras({
      vestibular: false,
      lingual: false,
      oclusal: false,
      incisal: false,
      mesial: false,
      distal: false,
      cervical: false,
    });
    setTodoElDiente(false);
    setObservacion("");
    setColor("#ffffff");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Número"
      />


    <div>

        {/* Checkboxes para las caras */}
        <Checkbox
          label="Vestibular"
          checked={caras.vestibular}
          onChange={(e) => setCaras({ ...caras, vestibular: e.target.checked })}
        />
        <Checkbox
          label="Lingual"
          checked={caras.lingual}
          onChange={(e) => setCaras({ ...caras, lingual: e.target.checked })}
        />
        {/* Checkboxes para las caras */}
        <Checkbox
          label="Oclusal"
          checked={caras.oclusal}
          onChange={(e) => setCaras({ ...caras, oclusal: e.target.checked })}
        />
        <br></br>
        <Checkbox
          label="Incisal"
          checked={caras.incisal}
          onChange={(e) => setCaras({ ...caras, incisal: e.target.checked })}
        />
        {/* Checkboxes para las caras */}
        <Checkbox
          label="Mesial"
          checked={caras.mesial}
          onChange={(e) => setCaras({ ...caras, mesial: e.target.checked })}
        />
        <Checkbox
          label="Distal"
          checked={caras.distal}
          onChange={(e) => setCaras({ ...caras, distal: e.target.checked })}
        />
        <br></br>
        {/* Checkboxes para las caras */}
        <Checkbox
          label="Cervical"
          checked={caras.cervical}
          onChange={(e) => setCaras({ ...caras, cervical: e.target.checked })}
        />
        {/* Agregar los checkboxes para las otras caras aquí */}
    </div>
    <br />
      {/* Checkbox para todoElDiente */}
      <Checkbox
        label="Todo el diente"
        checked={todoElDiente}
        onChange={(e) => setTodoElDiente(e.target.checked)}
      />

      <br></br>

      <DienteColorPicker color={color} onChange={setColor} />
      <br></br>
      {/* Campo de observaciones */}
      <input
        type="text"
        value={observacion}
        onChange={(e) => setObservacion(e.target.value)}
        placeholder="Observaciones"
      />
      <br></br>
      <br></br>
      {/* Otros campos del formulario */}
      <button type="submit">Agregar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default DienteForm;

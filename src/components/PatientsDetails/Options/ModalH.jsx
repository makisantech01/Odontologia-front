import React from "react";
import { useSelector } from "react-redux";
import { clientSelector } from "../../store/features/clientSlice";

const ModalH = ({ isOpen, onClose, children }) => {
  const client = useSelector((state) => state?.clients?.selectedClient.data);
  const paciente = client?.historial;
  const preguntas = [
    {
      campo: "enfermedad",
      pregunta: "¿Sufre alguna enfermedad?",
      detalle: "detalleEnfermedad",
    },
    {
      campo: "tratamientoMedico",
      pregunta: "¿Hace tratamiento médico?",
      detalle: "detalleTratamiento",
    },
    {
      campo: "medicacion",
      pregunta: "¿Toma alguna medicación?",
      detalle: "detalleMedicacion",
    },
    {
      campo: "alergia",
      pregunta: "¿Es alérgico a alguna droga?",
      detalle: "detalleAlergia",
    },
    {
      campo: "cicatrizacion",
      pregunta: "¿Tiene buena cicatrización?",
    },
    {
      campo: "fiebreReumatica",
      pregunta: "Fiebre Reumática",
    },
    {
      campo: "diabetes",
      pregunta: "Diabetes",
    },
    {
      campo: "problemasCardiacos",
      pregunta: "Problemas de corazón",
    },
    {
      campo: "aspirinas",
      pregunta: "Toma Aspirinas?",
    },
    {
      campo: "anticoagulante",
      pregunta: "Toma Anticoagulante?",
    },
    {
      campo: "tabaquismo",
      pregunta: "Fuma",
    },
    {
      campo: "embarazo",
      pregunta: "Embarazada",
      detalle: "mesesEmbarazo",
    },
    {
      campo: "hipertension",
      pregunta: "Hipertensión",
    },
    {
      campo: "hipotension",
      pregunta: "Hipotensión",
    },
    {
      campo: "problemasGastricos",
      pregunta: "Problemas Gástricos",
      detalle: "detalleGastricos",
    },
    {
      campo: "convulsiones",
      pregunta: "Tuvo convulsiones",
    },
    {
      campo: "epilepsia",
      pregunta: "Epilepsia",
    },
    {
      campo: "sifilisGonorreaHIV",
      pregunta: "Sífilis - Gonorrea - HIV",
    },
    {
      campo: "operacion",
      pregunta: "¿Alguna operación?",
      detalle: "detalleOperacion",
    },
    {
      campo: "problemasRespiratorios",
      pregunta: "Problemas respiratorios",
      detalle: "detalleRespiratorios",
    },
    {
      campo: "tiroides",
      pregunta: "Problema de tiroides",
      detalle: "detalleTiroides",
    },
    {
      campo: "otros",
      pregunta: "¿Otra enfermedad?",
      detalle: "detalleOtros",
    },
  ];

  const handleChange = (e, campo) => {
    const { value } = e.target;
    onSave({ ...paciente, [campo]: value === "true" });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white w-[90%] lg:w-[40%] rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <div className="flex justify-center">
              <h2 className="text-xl text-black font-bold mb-4">
                Editar Historial Medico
              </h2>
            </div>
            <form className="h-[30em] overflow-y-auto shadow-2xl py-2 px-2 rounded-lg">
              {preguntas.map((preguntaObj, index) => {
                const { campo, pregunta, detalle } = preguntaObj;
                const valor = paciente[campo];
                const detalleValor = paciente[detalle];

                return (
                  <div key={index}>
                    <label className="text-black">{pregunta}</label>
                    <select
                      className="text-black"
                      value={valor.toString()}
                      onChange={(e) => handleChange(e, campo)}
                    >
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>

                    {detalle && valor && (
                      <div>
                        <label className="text-black">¿Cuál?</label>
                        <input
                          type="text"
                          value={detalleValor}
                          onChange={(e) => handleChange(e, detalle)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </form>

            <div className="mt-4 flex justify-evenly">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={onClose}
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalH;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clientSelector,
  fetchClient,
  putHistorial,
} from "../../store/features/clientSlice";
import axios from "axios";
import { useEffect } from "react";

const ModalH = ({ isOpen, onClose }) => {
  const client = useSelector((state) => state?.clients?.selectedClient.data);
  const paciente = client?.historial;
  const pacienteDni = paciente.id;
  const clientDni = client.dni;

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
  const dispatch = useDispatch();
  const [patientUpdates, setPatientUpdates] = useState({ ...paciente });

  useEffect(() => {
    dispatch(fetchClient(clientDni));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var propiedadesExcluir = ["pacienteId", "fecha", "id"];

      var newPatientUpdates = Object.keys(patientUpdates)
        .filter(function (key) {
          return !propiedadesExcluir.includes(key);
        })
        .reduce(function (acc, key) {
          acc[key] = patientUpdates[key];
          return acc;
        }, {});

      console.log("new patient", newPatientUpdates);
      console.log("Client MODAL H", client);
      const response = await dispatch(
        putHistorial({ newPatientUpdates, pacienteDni, clientDni })
      );
      console.log("response ->", response);
      onClose();
    } catch (error) {
      console.error("Error al comunicarse con el servidor", error);
    }
  };

  const handleChange = (e, campo) => {
    const { value } = e.target;
    const parsedValue = JSON.parse(value);
    console.log("parseado", parsedValue);
    setPatientUpdates({
      ...patientUpdates,
      [campo]: parsedValue ? parsedValue : false,
    });
  };

  const detailChange = (e, detalle) => {
    const { value } = e.target;
    setPatientUpdates({ ...patientUpdates, [detalle]: value ? value : null });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white w-[90%] lg:w-[50%] rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <div className="flex justify-center">
              <h2 className="text-xl text-black font-bold mb-4">
                Editar Historial Medico
              </h2>
            </div>
            <form className="h-[30em] w-[100%] overflow-y-auto shadow-2xl py-2 px-2 rounded-lg">
              {preguntas.map((preguntaObj, index) => {
                const { campo, pregunta, detalle } = preguntaObj;
                const valor = paciente[campo];
                // console.log("valor ->", valor);
                const detalleValor = paciente[detalle];
                console.log("PatietnUpedates", patientUpdates[campo]);
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <label className="text-black">{pregunta}</label>
                      <select
                        className="text-black"
                        defaultValue={valor ? "true" : "false"}
                        onChange={(e) => handleChange(e, campo)}
                      >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    {detalleValor ? (
                      <div className="flex justify-between mb-2 ">
                        <label className="text-black">¿Cuál?</label>
                        <input
                          className="text-black text-right px-2"
                          type="text"
                          defaultValue={detalleValor}
                          onChange={(e) => detailChange(e, detalle)}
                          placeholder="Cual?"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </form>

            <div className="mt-4 flex justify-evenly">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={(e) => handleSubmit(e)}
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

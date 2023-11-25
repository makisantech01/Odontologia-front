import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { clientSelector } from "../../store/features/clientSlice.js";
import ModalH from "./ModalH.jsx";

const MedicalHistoryForm = ({ isModalOpen, setIsModalOpen }) => {
  const client = useSelector(clientSelector);
  const paciente = client?.data?.historial;
  const pacienteInicial = paciente;
  const [pacienteIni, setPacienteIni] = useState(pacienteInicial);
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

  const url = import.meta.env.VITE_ENDPOINT;
  const handleSaveChanges = (nuevoPaciente) => {
    axios
      .put(`${url}/historiales/${nuevoPaciente.id}`, nuevoPaciente)
      .then((response) => {
        setPacienteIni(nuevoPaciente);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error al realizar la petición PUT:", error);
      });
  };

  const Pregunta = ({ pregunta, valor }) => (
    <div className="flex justify-between mb-3">
      <p className="">{pregunta}</p>
      {valor ? <p>Si</p> : <p>No</p>}
    </div>
  );

  const PreguntaConDetalle = ({ pregunta, valor, detalle }) => (
    <div className="flex justify-between mb-3">
      <p>{pregunta}</p>
      {valor ? (
        <>
          <p>{detalle}</p>
        </>
      ) : (
        <p>No</p>
      )}
    </div>
  );

  return (
    <>
      {pacienteInicial ? (
        <>
          <Formik initialValues={paciente}>
            {({ values }) => (
              <div className="flex flex-col items-center flex-end w-full gap-5">
                <Form className=" lg:w-[70%] w-[95%] h-[25em] overflow-y-auto p-5 shadow-2xl rounded-lg bg-[#14212a] scrollbar-hide">
                  {preguntas?.map((preguntaObj, index) => {
                    const { campo, pregunta, detalle } = preguntaObj;
                    const valor = values[campo];
                    return detalle ? (
                      <div key={index}>
                        <Pregunta pregunta={pregunta} valor={valor} />
                        {valor && (
                          <PreguntaConDetalle
                            pregunta="¿Cuál?"
                            valor={true}
                            detalle={values[detalle]}
                          />
                        )}
                      </div>
                    ) : (
                      <Pregunta pregunta={pregunta} valor={valor} key={index} />
                    );
                  })}
                </Form>
              </div>
            )}
          </Formik>
          <ModalH
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveChanges}
            paciente={paciente}
          />
        </>
      ) : (
        <div>Aun no posee un historial medico</div>
      )}
    </>
  );
};

export default MedicalHistoryForm;

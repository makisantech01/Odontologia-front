import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  validationSchema,
  initialValues,
} from "../../../Validations/FormVal.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientSelector } from "../../store/features/clientSlice.js";

const MedicalHistoryForm = () => {
  const client = useSelector(clientSelector);
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
      campo: "anticoagulante",
      pregunta: "Toma Aspirina o anticoagulante",
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
    <Formik initialValues={paciente}>
      {({ values }) => (
        <Form className=" w-[80%] h-[30em] justify-center items-center overflow-y-auto p-3 shadow-2xl rounded-lg bg-[#14212a]">
          {preguntas.map((preguntaObj, index) => {
            const { campo, pregunta, detalle } = preguntaObj;
            const valor = values[campo];
            return detalle ? (
              <div key={index} className="">
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
          <div>
            <button className="bg-blue-300">Editar</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MedicalHistoryForm;

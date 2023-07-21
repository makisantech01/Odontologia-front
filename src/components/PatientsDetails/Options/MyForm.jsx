import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  validationSchema,
  initialValues,
} from "../../../Validations/FormVal.js";

const MyForm = () => {
  return (
    <div className="container mx-auto mt-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            values.enfermedad = values.enfermedad === "si";
            values.tratamientoMedico = values.tratamientoMedico === "si";
            values.medicacion = values.medicacion === "si";
            values.alergia = values.alergia === "si";
            values.cicatrizacion = values.cicatrizacion === "si";
            values.fiebreReumatica = values.fiebreReumatica === "si";
            values.diabetes = values.diabetes === "si";
            values.problemasCardiacos = values.problemasCardiacos === "si";
            values.aspirinas = values.aspirinas === "si";
            values.anticoagulante = values.anticoagulante === "si";
            values.tabaquismo = values.tabaquismo === "si";
            values.embarazo = values.embarazo === "si";
            values.hipertension = values.hipertension === "si";
            values.hipotension = values.hipotension === "si";
            values.problemasRenales = values.problemasRenales === "si";
            values.problemasGastricos = values.problemasGastricos === "si";
            values.convulsiones = values.convulsiones === "si";
            values.epilepsia = values.epilepsia === "si";
            values.sifilisGonorreaHIV = values.sifilisGonorreaHIV === "si";
            values.operacion = values.operacion === "si";
            values.problemasRespiratorios === "si";
            values.tiroides = values.tiroides === "si";
            values.otros = values.otros === "si";
            values.operacion = values.operacion === "si";
            values.consentimiento = values.consentimiento === "si";

            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col p-2">
            <div className="flex">
              <div className=" w-1/2 flex flex-col gap-2">
                {/* Section 1 */}
                {/* Question 1 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Sufre de alguna enfermedad?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="enfermedad"
                        value="si"
                        onClick={() => setFieldValue("enfermedad", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="enfermedad"
                        value="no"
                        onClick={() => {
                          setFieldValue("enfermedad", "no");
                          setFieldValue("detalleEnfermedad", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="enfermedad"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </div>
                {values.enfermedad === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span
                        htmlFor="detalleEnfermedad"
                        className="block w-auto"
                      >
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleEnfermedad"
                        name="detalleEnfermedad"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleEnfermedad"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 2 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Hace tratamiento medico?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="tratamientoMedico"
                        value="si"
                        onClick={() => setFieldValue("tratamientoMedico", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="tratamientoMedico"
                        value="no"
                        onClick={() => {
                          setFieldValue("tratamientoMedico", "no");
                          setFieldValue("detalleTratamiento", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="tratamientoMedico"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </div>
                {values.tratamientoMedico === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span
                        htmlFor="detalleTratamiento"
                        className="block w-auto"
                      >
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleTratamiento"
                        name="detalleTratamiento"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleTratamiento"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 3 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Toma alguna medcacion?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="medicacion"
                        value="si"
                        onClick={() => setFieldValue("medicacion", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="medicacion"
                        value="no"
                        onClick={() => {
                          setFieldValue("medicacion", "no");
                          setFieldValue("detalleMedicacion", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="medicacion"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </div>
                {values.medicacion === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span
                        htmlFor="detalleMedicacion"
                        className="block w-auto"
                      >
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleMedicacion"
                        name="detalleMedicacion"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleMedicacion"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 4 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Es alergico a alguna droga?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="alergia"
                        value="si"
                        onClick={() => setFieldValue("alergia", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="alergia"
                        value="no"
                        onClick={() => {
                          setFieldValue("alergia", "no");
                          setFieldValue("detalleAlergia", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="alergia"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </div>
                {values.alergia === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span htmlFor="detalleAlergia" className="block w-auto">
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleAlergia"
                        name="detalleAlergia"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleAlergia"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 5 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">¿Tiene buena cicatrizacion?</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="cicatrizacion"
                        value="si"
                        onClick={() => setFieldValue("cicatrizacion", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="cicatrizacion"
                        value="no"
                        onClick={() => setFieldValue("cicatrizacion", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="cicatrizacion"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 6 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Fiebre reumatica</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="fiebreReumatica"
                        value="si"
                        onClick={() => setFieldValue("fiebreReumatica", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="fiebreReumatica"
                        value="no"
                        onClick={() => setFieldValue("fiebreReumatica", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="fiebreReumatica"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 7 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Diabetes</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="diabetes"
                        value="si"
                        onClick={() => setFieldValue("diabetes", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="diabetes"
                        value="no"
                        onClick={() => setFieldValue("diabetes", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="diabetes"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 8 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Problemas del corazón</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="problemasCardiacos"
                        value="si"
                        onClick={() =>
                          setFieldValue("problemasCardiacos", "si")
                        }
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="problemasCardiacos"
                        value="no"
                        onClick={() =>
                          setFieldValue("problemasCardiacos", "no")
                        }
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="problemasCardiacos"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 9 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Aspirinas</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="aspirinas"
                        value="si"
                        onClick={() => setFieldValue("aspirinas", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="aspirinas"
                        value="no"
                        onClick={() => setFieldValue("aspirinas", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="aspirinas"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 10 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Anticuagulantes</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="anticuagulantes"
                        value="si"
                        onClick={() => setFieldValue("anticuagulantes", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="anticuagulantes"
                        value="no"
                        onClick={() => setFieldValue("anticuagulantes", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="anticuagulantes"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 11*/}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Fuma</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="tabaquismo"
                        value="si"
                        onClick={() => setFieldValue("tabaquismo", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="tabaquismo"
                        value="no"
                        onClick={() => setFieldValue("tabaquismo", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="tabaquismo"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 12 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2">
                    <span className="">Embarazada</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="embarazo"
                        value="si"
                        onClick={() => setFieldValue("embarazo", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="embarazo"
                        value="no"
                        onClick={() => {
                          setFieldValue("embarazo", "no");
                          setFieldValue("detalleEnfermedad", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="embarazo"
                    component="div"
                    className="text-red-500 font-semibold"
                  />
                </div>
                {values.embarazo === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span
                        htmlFor="detalleEnfermedad"
                        className="block w-auto"
                      >
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleEnfermedad"
                        name="detalleEnfermedad"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleEnfermedad"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
              </div>
              <div className="w-1/2">
                {/* Section 2 */}
                {/* Question 13 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Hipertensión</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="hipertension"
                        value="si"
                        onClick={() => setFieldValue("hipertension", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="hipertension"
                        value="no"
                        onClick={() => setFieldValue("hipertension", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="hipertension"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 14 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Hipotensión</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="hipotension"
                        value="si"
                        onClick={() => setFieldValue("hipotension", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="hipotension"
                        value="no"
                        onClick={() => setFieldValue("hipotension", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="hipotension"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 15 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Problemas renales</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="problemasRenales"
                        value="si"
                        onClick={() => setFieldValue("problemasRenales", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="problemasRenales"
                        value="no"
                        onClick={() => setFieldValue("problemasRenales", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="problemasRenales"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 16 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Problemas Gastricos</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="problemasGastricos"
                        value="si"
                        onClick={() =>
                          setFieldValue("problemasGastricos", "si")
                        }
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="problemasGastricos"
                        value="no"
                        onClick={() => {
                          setFieldValue("problemasGastricos", "no");
                          setFieldValue("detalleGastricos", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="problemasGastricos"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                {values.problemasGastricos === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span htmlFor="detalleGastricos" className="block w-auto">
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleGastricos"
                        name="detalleGastricos"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleGastricos"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 17 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Convulsiones</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="convulsiones"
                        value="si"
                        onClick={() => setFieldValue("convulsiones", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="convulsiones"
                        value="no"
                        onClick={() => setFieldValue("convulsiones", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="convulsiones"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 18 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Epilepsia</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="epilepsia"
                        value="si"
                        onClick={() => setFieldValue("epilepsia", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="epilepsia"
                        value="no"
                        onClick={() => setFieldValue("epilepsia", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="epilepsia"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 19 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">Sifilis - Gonorrea - HIV</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="sifilisGonorreaHIV"
                        value="si"
                        onClick={() =>
                          setFieldValue("sifilisGonorreaHIV", "si")
                        }
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="sifilisGonorreaHIV"
                        value="no"
                        onClick={() =>
                          setFieldValue("sifilisGonorreaHIV", "no")
                        }
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="sifilisGonorreaHIV"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 20 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Alguna operacion?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="operacion"
                        value="si"
                        onClick={() => setFieldValue("operacion", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="operacion"
                        value="no"
                        onClick={() => {
                          setFieldValue("operacion", "no");
                          setFieldValue("detalleOperacion", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="operacion"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                {values.operacion === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span htmlFor="detalleOperacion" className="block w-auto">
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleOperacion"
                        name="detalleOperacion"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleOperacion"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                )}
                {/* Question 21 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className="">Problema respiratorio</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="problemasRespiratorios"
                        value="si"
                        onClick={() =>
                          setFieldValue("problemasRespiratorios", "si")
                        }
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="problemasRespiratorios"
                        value="no"
                        onClick={() => {
                          setFieldValue("problemasRespiratorios", "no");
                          setFieldValue("detalleRespiratorios", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="problemasRespiratorios"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                {values.problemasRespiratorios === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span
                        htmlFor="detalleRespiratorios"
                        className="block w-auto"
                      >
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleRespiratorios"
                        name="detalleRespiratorios"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleRespiratorios"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                )}
                {/* Question 22 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className="">Problema de tiroides</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="tiroides"
                        value="si"
                        onClick={() => setFieldValue("tiroides", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="tiroides"
                        value="no"
                        onClick={() => {
                          setFieldValue("tiroides", "no");
                          setFieldValue("detalleTiroides", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="tiroides"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                {values.tiroides === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span htmlFor="detalleTiroides" className="block w-auto">
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleTiroides"
                        name="detalleTiroides"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleTiroides"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                )}
                {/* Question 23 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className="">¿Otra enfermedad?</span>
                    <label className="block">
                      <Field
                        type="radio"
                        name="otros"
                        value="si"
                        onClick={() => setFieldValue("otros", "si")}
                      />
                      <span className="ml-2">Sí</span>
                    </label>
                    <label className="block">
                      <Field
                        type="radio"
                        name="otros"
                        value="no"
                        onClick={() => {
                          setFieldValue("otros", "no");
                          setFieldValue("detalleOtros", "");
                        }}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="otros"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                {values.otros === "si" && (
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span htmlFor="detalleOtros" className="block w-auto">
                        ¿Cual?
                      </span>
                      <Field
                        type="text"
                        id="detalleOtros"
                        name="detalleOtros"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="detalleOtros"
                      component="div"
                      className="text-red-600 font-semibold"
                    />
                  </div>
                )}
                {/* Question 24 */}
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="">¿Alguna operacion?</span>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="operacion"
                        value="si"
                        onClick={() => setFieldValue("operacion", "si")}
                      />
                      <span className="ml-2">Si</span>
                    </label>
                    <label className="block mb-1">
                      <Field
                        type="radio"
                        name="operacion"
                        value="no"
                        onClick={() => setFieldValue("operacion", "no")}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="operacion"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className=" w-full flex justify-center items-center gap-3 py-3 px-5 font-thin">
                <label>
                  He comprendido todos los explicaciones que se me han
                  facilitado en el lenguaje claro y sencillo, he podido realizar
                  todas las observaciones y se me han aclarado todas las dudas;
                  por lo que estoy completamente de acuerdo con el tratamiento
                  que se me va a realizar. Otorgo mi consentimiento para
                  realizar el tratamiento necesario para rehabilitar mi solud
                  bucodental propuesta por el/la Dr/a MP.
                  <Field
                    type="checkbox"
                    id="consentimiento"
                    name="consentimiento"
                    checked="consentimiento"
                    onChange={(e) => {
                      setFieldValue(e.target.checked);
                    }}
                    className="ml-5"
                  />
                  <ErrorMessage
                    component="label"
                    name="consentimiento"
                    className="text-red-600"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-[5em]"
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;

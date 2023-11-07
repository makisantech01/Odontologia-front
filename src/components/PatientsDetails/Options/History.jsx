import React from "react";

const History = () => {
  const onSubmitHandler = (values, { setSubmitting }) => {
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
    values.problemasRespiratorios = values.problemasRespiratorios === "si";
    values.tiroides = values.tiroides === "si";
    values.otros = values.otros === "si";
    values.consentimiento = values.consentimiento === "si";

    const url = import.meta.env.VITE_ENDPOINT;
    const endpointUrl = `${url}/historiales/${id}`;
    if (isEditing) {
      axios
        .put(endpointUrl, values)
        .then((response) => {
          setFormData(response.data);
          setIsEditing(false);
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error en la solicitud PUT:", error);
          setSubmitting(false);
        });
    } else {
      axios
        .post(endpointUrl, values)
        .then((response) => {
          alert("El formulario se completo exitosamente!");
          setFormData(response.data);
          setIsEditing(true);
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error en la solicitud POST:", error);
          setSubmitting(false);
        });
    }
  };
  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col p-2">
            <div className="flex lg:flex-row flex-col">
              <div className=" lg:w-1/2 flex flex-col gap-2 px-4 py-2">
                {/* Section 1 */}
                {/* Question 1 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex gap-2 justify-between">
                    <div>
                      <span className="">¿Sufre de alguna enfermedad?</span>
                    </div>
                    <div className="flex gap-8">
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
                  <div className="flex gap-2 justify-between">
                    <div>
                      <span className="">¿Hace tratamiento medico?</span>
                    </div>
                    <div className="flex gap-8">
                      <label className="block">
                        <Field
                          type="radio"
                          name="tratamientoMedico"
                          value="si"
                          onClick={() =>
                            setFieldValue("tratamientoMedico", "si")
                          }
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
                  <div className="flex justify-between">
                    <span className="">¿Toma alguna medcacion?</span>
                    <div className="flex gap-8">
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
                  <div className="flex justify-between">
                    <span className="">¿Es alergico a alguna droga?</span>
                    <div className="flex gap-8">
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
                  <div className="flex justify-between">
                    <span className="">¿Tiene buena cicatrizacion?</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="cicatrizacion"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 6 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Fiebre reumatica</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="fiebreReumatica"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 7 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Diabetes</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="diabetes"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 8 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Problemas del corazón</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="problemasCardiacos"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 9 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Aspirinas</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="aspirinas"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 10 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Anticoagulante</span>
                    <div className="flex gap-8">
                      <label className="block mb-1">
                        <Field
                          type="radio"
                          name="anticoagulante"
                          value="si"
                          onClick={() => setFieldValue("anticoagulante", "si")}
                        />
                        <span className="ml-2">Si</span>
                      </label>
                      <label className="block mb-1">
                        <Field
                          type="radio"
                          name="anticoagulante"
                          value="no"
                          onClick={() => setFieldValue("anticoagulante", "no")}
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="anticoagulante"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 11*/}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Fuma</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="tabaquismo"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 12 */}
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex justify-between">
                    <span className="">Embarazada</span>
                    <div className="flex gap-8">
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
                      <span htmlFor="mesesEmbarazo" className="block w-auto">
                        ¿De cuantos meses?
                      </span>
                      <Field
                        type="number"
                        id="mesesEmbarazo"
                        name="mesesEmbarazo"
                        className=" rounded-md bg-slate-400 outline-none pl-3"
                      />
                    </div>
                    <ErrorMessage
                      name="mesesEmbarazo"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
              </div>
              <div className="lg:w-1/2 flex flex-col gap-2 px-4 py-2">
                {/* Section 2 */}
                {/* Question 13 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span>Hipertensión</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="hipertension"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 14 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Hipotensión</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="hipotension"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 15 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Problemas renales</span>
                    <div className="flex gap-8">
                      <label className="block mb-1">
                        <Field
                          type="radio"
                          name="problemasRenales"
                          value="si"
                          onClick={() =>
                            setFieldValue("problemasRenales", "si")
                          }
                        />
                        <span className="ml-2">Si</span>
                      </label>
                      <label className="block mb-1">
                        <Field
                          type="radio"
                          name="problemasRenales"
                          value="no"
                          onClick={() =>
                            setFieldValue("problemasRenales", "no")
                          }
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="problemasRenales"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 16 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Problemas Gastricos</span>
                    <div className="flex gap-8">
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
                  <div className="flex justify-between">
                    <span className="">Convulsiones</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="convulsiones"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 18 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Epilepsia</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="epilepsia"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 19 */}
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="">Sifilis - Gonorrea - HIV</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="sifilisGonorreaHIV"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {/* Question 20 */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="">¿Alguna operacion?</span>
                    <div className="flex gap-8">
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
                <div className="flex flex-col gap-2 lg:gap-2">
                  <div className="flex justify-between">
                    <span className="">Problemas respiratorios</span>
                    <div className="flex gap-8">
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
                  </div>
                  <ErrorMessage
                    name="problemasRespiratorios"
                    component="div"
                    className="text-red-500 font-semibold"
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
                      className="text-red-500 font-semibold"
                    />
                  </div>
                )}
                {/* Question 22 */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="">Problema de tiroides</span>
                    <div className="flex gap-8">
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
                  <div className="flex justify-between">
                    <span className="">¿Otra enfermedad?</span>
                    <div className="flex gap-8">
                      {" "}
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
              </div>
            </div>
            <div className="flex flex-col justify-center items-center py-4 gap-3">
              <div className=" w-[80%] flex justify-center items-center gap-3 py-3 px-5 font-thin">
                <label className="text-center px-3">
                  He comprendido todos los explicaciones que se me han
                  facilitado en el lenguaje claro y sencillo, he podido realizar
                  todas las observaciones y se me han aclarado todas las dudas;
                  por lo que estoy completamente de acuerdo con el tratamiento
                  que se me va a realizar. Otorgo mi consentimiento para
                  realizar el tratamiento necesario para rehabilitar mi solud
                  bucodental propuesta por el/la Dr/a MP.
                  <Field
                    type="radio"
                    name="consentimiento"
                    value="si"
                    onClick={() => setFieldValue("consentimiento", "si")}
                    className="ml-5"
                  />
                  <ErrorMessage
                    component="label"
                    name="consentimiento"
                    className="text-red-600"
                  />
                </label>
              </div>

              <div className="flex gap-8">
                {!isEditing && (
                  <button type="button" onClick={() => setIsEditing(true)}>
                    Actualizar
                  </button>
                )}
                <button type="submit" disabled={!isEditing || isSubmitting}>
                  {isEditing ? "Guardar" : "Crear"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default History;

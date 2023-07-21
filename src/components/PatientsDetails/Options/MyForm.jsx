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
            values.hipertension = values.hipertension === "si";

            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col">
            <div className="flex">
              <div className="bg-green-300 w-1/2">
                {/* Question 1 */}
                <div className="mb-4 flex gap-2 lg:gap-5">
                  <label className="text-2xl font-bold mb-4">
                    ¿Sufre de alguna enfermedad?
                  </label>
                  <label className="block mb-1">
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
                  <ErrorMessage
                    name="enfermedad"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                {values.enfermedad === "si" && (
                  <div>
                    <label htmlFor="detalleEnfermedad" className="block mb-1">
                      Cual es la enfermedad?
                    </label>
                    <Field
                      type="text"
                      id="detalleEnfermedad"
                      name="detalleEnfermedad"
                      placeholder="Ingrese el nombre de la enfermedad"
                      className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="detalleEnfermedad"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                )}
              </div>
              <div className="bg-purple-300 w-1/2">
                {/* Quesiton 2 */}
                <div className="flex gap-3">
                  <span className="ml-2">Hipertensión</span>
                  <label className="block mb-1">
                    <Field
                      type="radio"
                      name="hipertension"
                      value="si"
                      onClick={() => setFieldValue("hipertension", "si")}
                    />
                    Si
                  </label>
                  <label className="block mb-1">
                    <Field
                      type="radio"
                      name="hipertension"
                      value="no"
                      onClick={() => setFieldValue("hipertension", "no")}
                    />
                    No
                  </label>
                  <ErrorMessage
                    name="hipertension"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
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

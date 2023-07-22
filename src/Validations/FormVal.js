import * as yup from "yup";

export const validationSchema = yup.object({
  enfermedad: yup.string().required("Este campo es requerido"),
  detalleEnfermedad: yup.string().when("enfermedad", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  tratamientoMedico: yup.string().required("Este campo es requerido"),
  detalleTratamiento: yup.string().when("tratamientoMedico", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  medicacion: yup.string().required("Este campo es requerido"),
  detalleMedicacion: yup.string().when("medicacion", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  alergia: yup.string().required("Este campo es requerido"),
  detalleAlergia: yup.string().when("alergia", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  cicatrizacion: yup.string().required("Este campo es requerido"),

  fiebreReumatica: yup.string().required("Este campo es requerido"),

  diabetes: yup.string().required("Este campo es requerido"),

  problemasCardiacos: yup.string().required("Este campo es requerido"),

  aspirinas: yup.string().required("Este campo es requerido"),

  anticoagulante: yup.string().required("Este campo es requerido"),

  tabaquismo: yup.string().required("Este campo es requerido"),

  embarazo: yup.string().required("Este campo es requerido"),
  mesesEmbarazo: yup.string().when("embarazo", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  hipertension: yup.string().required("Este campo es requerido"),

  hipotension: yup.string().required("Este campo es requerido"),

  problemasRenales: yup.string().required("Este campo es requerido"),

  problemasGastricos: yup.string().required("Este campo es requerido"),
  detalleGastricos: yup.string().when("problemasGastricos", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  convulsiones: yup.string().required("Este campo es requerido"),

  epilepsia: yup.string().required("Este campo es requerido"),

  sifilisGonorreaHIV: yup.string().required("Este campo es requerido"),

  operacion: yup.string().required("Este campo es requerido"),
  detalleOperacion: yup.string().when("operacion", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  problemasRespiratorios: yup.string().required("Este campo es requerido"),
  detalleRespiratorios: yup.string().when("problemasRespiratorios", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  tiroides: yup.string().required("Este campo es requerido"),
  detalleTiroides: yup.string().when("tiroides", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  otros: yup.string().required("Este campo es requerido"),
  detalleOtros: yup.string().when("otros", {
    is: "si",
    then: () => yup.string().required("Este campo es requerido"),
  }),

  consentimiento: yup.string().required("Este campo es requerido"),
});

export const initialValues = {
  enfermedad: "",
  detalleEnfermedad: "",
  tratamientoMedico: "",
  detalleTratamiento: "",
  medicacion: "",
  detalleMedicacion: "",
  alergia: "",
  detalleAlergia: "",
  cicatrizacion: "",
  fiebreReumatica: "",
  diabetes: "",
  problemasCardiacos: "",
  aspirinas: "",
  anticoagulante: "",
  tabaquismo: "",
  embarazo: "",
  mesesEmbarazo: 0,
  hipertension: "",
  hipotension: "",
  problemasRenales: "",
  problemasGastricos: "",
  detalleGastricos: "",
  convulsiones: "",
  epilepsia: "",
  sifilisGonorreaHIV: "",
  operacion: "",
  detalleOperacion: "",
  problemasRespiratorios: "",
  detalleRespiratorios: "",
  tiroides: "",
  detalleTiroides: "",
  otros: "",
  detalleOtros: "",
  consentimiento: "",
};

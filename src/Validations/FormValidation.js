import * as yup from "yup";

export const validationSchema = yup.object().shape({
  gender: yup.string().required("Este campo es requerido"),
  detalleEnfermedad: yup.string().when("enfermedad", {
    is: (value) => value === "si",
    then: yup
      .string()
      .required("Este campo es requerido cuando tiene una enfermedad"),
  }),
  // tratamientoMedico: yup.string().required("Este campo es requerido"),
  // detalleTratamiento: yup.string().when("tratamientoMedico", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando está bajo tratamiento médico"),
  // }),
  // medicacion: yup.string().required("Este campo es requerido"),
  // detalleMedicacion: yup.string().when("medicacion", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando toma medicación"),
  // }),
  // alergia: yup.string().required("Este campo es requerido"),
  // detalleAlergia: yup.string().when("alergia", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando tiene alergia a alguna droga"),
  // }),
  // cicatrizacion: yup.boolean().required("Este campo es requerido"),
  // fiebreReumatica: yup.boolean().required("Este campo es requerido"),
  // diabetes: yup.boolean().required("Este campo es requerido"),
  // problemasCardiacos: yup.boolean().required("Este campo es requerido"),
  // aspirinas: yup.boolean().required("Este campo es requerido"),
  // anticoagulante: yup.boolean().required("Este campo es requerido"),
  // tabaquismo: yup.boolean().required("Este campo es requerido"),
  // embarazo: yup.string().when("tabaquismo", {
  //   is: "si",
  //   then: yup.string().required("Este campo es requerido cuando fuma"),
  // }),
  // mesesEmbarazo: yup.string().when(["tabaquismo", "embarazo"], {
  //   is: (tabaquismo, embarazo) => tabaquismo === "si" && embarazo === "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando fuma y está embarazada"),
  // }),
  // hipertension: yup.boolean().required("Este campo es requerido"),
  // hipotension: yup.boolean().required("Este campo es requerido"),
  // problemasRenales: yup.boolean().required("Este campo es requerido"),
  // problemasGastricos: yup.boolean().required("Este campo es requerido"),
  // detalleGastricos: yup.string().when("problemasGastricos", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando tiene problemas gástricos"),
  // }),
  // convulsiones: yup.boolean().required("Este campo es requerido"),
  // epilepsia: yup.boolean().required("Este campo es requerido"),
  // sifilisGonorreaHIV: yup.boolean().required("Este campo es requerido"),
  // operacion: yup.boolean().required("Este campo es requerido"),
  // detalleOperacion: yup.string().when("operacion", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando ha tenido alguna operación"),
  // }),
  // problemasRespiratorios: yup.boolean().required("Este campo es requerido"),
  // detalleRespiratorios: yup.string().when("problemasRespiratorios", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando tiene problemas respiratorios"),
  // }),
  // tiroides: yup.boolean().required("Este campo es requerido"),
  // detalleTiroides: yup.string().when("tiroides", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required("Este campo es requerido cuando tiene problemas de tiroides"),
  // }),
  // otros: yup.boolean().required("Este campo es requerido"),
  // detalleOtros: yup.string().when("otros", {
  //   is: "si",
  //   then: yup
  //     .string()
  //     .required(
  //       "Este campo es requerido cuando tiene otros problemas de salud"
  //     ),
  // }),
  consentimiento: yup
    .boolean()
    .oneOf([true], "Debe otorgar su consentimiento para continuar"),
});

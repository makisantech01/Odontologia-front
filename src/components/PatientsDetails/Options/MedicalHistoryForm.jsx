import React, { useState } from "react";

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    enfermedad: "Seleccione...",
    detalleEnfermedad: "",
    tratamientoMedico: "Seleccione...",
    detalleTratamiento: "",
    medicacion: "Seleccione...",
    detalleMedicacion: "",
    alergia: "Seleccione...",
    detalleAlergia: "",
    cicatrizacion: false,
    fiebreReumatica: false,
    diabetes: false,
    problemasCardiacos: false,
    aspirinas: false,
    anticoagulante: false,
    tabaquismo: true,
    embarazo: "Seleccione...",
    mesesEmbarazo: 0,
    hipertensio: false,
    hipotension: false,
    problemasRenales: false,
    problemasGastricos: false,
    detalleGastricos: "",
    convulsiones: false,
    epilepsia: false,
    sifilisGonorreaHIV: false,
    operacion: "Seleccione...",
    detalleOperacion: "",
    problemasRespiratorios: false,
    detalleRespiratorios: "",
    tiroides: "Seleccione...",
    detalleTiroides: "",
    otros: "Seleccione...",
    detalleOtros: "",
    consentimiento: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [name]:
        name === "enfermedad" ||
        name === "tratamientoMedico" ||
        name === "medicacion" ||
        name === "alergia" ||
        name === "embarazo" ||
        name === "operacion" ||
        name === "tiroides" ||
        name === "otros"
          ? value === "true"
            ? true
            : false
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("lo dato ->", formData);
  };

  return (
    <form
      className="w-[65%] h-[30em] rounded-lg outline-none overflow-y-auto mx-auto p-4 bg-[#14212A]"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 flex justify-between">
        <label className="mb-1 mr-4" htmlFor="enfermedad">
          ¿Sufre alguna enfermedad?
        </label>
        <select
          id="enfermedad"
          name="enfermedad"
          className=" text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData?.enfermedad}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.enfermedad ? (
        <div className="mb-4 flex justify-between">
          <label className="block mb-1 mr-4" htmlFor="detalleEnfermedad">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleEnfermedad"
            name="detalleEnfermedad"
            className=" w-1/2 rounded-lg  text-black pl-2 outline-none"
            onChange={handleChange}
            value={formData.detalleEnfermedad}
          />
        </div>
      ) : null}
      <div className="mb-4 flex justify-between">
        <label className="block mb-1 mr-4" htmlFor="tratamientoMedico">
          ¿Hace tratamiento médico?
        </label>
        <select
          id="tratamientoMedico flex justify-between"
          name="tratamientoMedico"
          className=" text-black outline-none rounded-lg "
          onChange={handleChange}
          value={formData.tratamientoMedico}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.tratamientoMedico === true && (
        <div className="mb-4 flex justify-between">
          <label className="block mb-1 mr-4" htmlFor="detalleTratamiento">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleTratamiento"
            name="detalleTratamiento"
            className=" w-1/2 rounded-lg text-black outline-none pl-2"
            onChange={handleChange}
            value={formData.detalleTratamiento}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mb-1 mr-4" htmlFor="medicacion">
          ¿Toma alguna medicación?
        </label>
        <select
          id="medicacion"
          name="medicacion"
          className="rounded-lg  text-black outline-none"
          onChange={handleChange}
          value={formData.medicacion}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.medicacion === true && (
        <div className="mb-4 flex justify-between">
          <label className="block mb-1 mr-4" htmlFor="detalleMedicacion">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleMedicacion"
            name="detalleMedicacion"
            className="text-black w-1/2 rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleMedicacion}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="block mb-1 mr-4" htmlFor="alergia">
          ¿Es alérgico a alguna droga?
        </label>
        <select
          id="alergia"
          name="alergia"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.alergia}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.alergia === true && (
        <div className="mb-4 flex justify-between">
          <label className="block mb-1 mr-4" htmlFor="detalleAlergia">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleAlergia"
            name="detalleAlergia"
            className="text-black w-1/2 rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleAlergia}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="block mb-1 mr-4" htmlFor="cicatrizacion">
          ¿Tiene buena cicatrización?
        </label>
        <select
          id="cicatrizacion"
          name="cicatrizacion"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.cicatrizacion}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="block mb-1 mr-4" htmlFor="tieneFiebreReumatica">
          Fiebre Reumática
        </label>
        <select
          id="tieneFiebreReumatica"
          name="fiebreReumatica"
          className="text-black rounded-lg  outline-none"
          onChange={handleChange}
          value={formData.fiebreReumatica}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="block mb-1 mr-4" htmlFor="tieneDiabetes">
          Diabetes
        </label>
        <select
          id="tieneDiabetes"
          name="diabetes"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.diabetes}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mb-1 mr-4" htmlFor="tieneProblemasCorazon">
          Problemas de corazón
        </label>
        <select
          id="tieneProblemasCorazon"
          name="problemasCardiacos"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.problemasCardiacos}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mb-1 mr-4" htmlFor="aspirinas">
          Toma Aspirina o anticoagulante
        </label>

        <select
          id="aspirinas"
          name="aspirinas"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.aspirinas}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tabaquismo">
          Fuma
        </label>
        <select
          id="tabaquismo"
          name="tabaquismo"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.tabaquismo}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="embarazo">
          Embarazada
        </label>
        <select
          id="embarazo"
          name="embarazo"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.embarazo}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.embarazo === true && (
        <div className="mb-4 flex justify-between">
          <label className=" mb-1 mr-4" htmlFor="mesesEmbarazo">
            ¿De cuántos Meses?
          </label>
          <input
            type="text"
            id="mesesEmbarazo"
            name="mesesEmbarazo"
            className="text-black rounded-lg outline-none"
            onChange={handleChange}
            value={formData.mesesEmbarazo}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tieneHipertension">
          Hipertensión
        </label>
        <select
          id="tieneHipertension"
          name="hipertension"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.hipertension}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tieneHipotension">
          Hipotensión
        </label>
        <select
          id="tieneHipotension"
          name="hipotension"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.hipotension}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tieneProblemasGastricos">
          Problemas Gástricos
        </label>
        <select
          id="tieneProblemasGastricos"
          name="problemasRenales"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.problemasRenales}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.problemasRenales === true && (
        <div className="flex justify-between mb-4">
          <label className="mr-4 mb-1" htmlFor="detalleGastricos">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleGastricos"
            name="detalleGastricos"
            className="rounded-lg w-1/2 text-black"
            onChange={handleChange}
            value={formData.detalleGastricos}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="convulsiones">
          Tuvo convulsiones
        </label>
        <select
          id="convulsiones"
          name="convulsiones"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.convulsiones}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tieneEpilepsia">
          Epilepsia
        </label>
        <select
          id="tieneEpilepsia"
          name="epilepsia"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.epilepsia}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="sifilisGonorreaHIV">
          Sífilis - Gonorrea - HIV
        </label>
        <select
          id="sifilisGonorreaHIV"
          name="sifilisGonorreaHIV"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.sifilisGonorreaHIV}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="operacion">
          ¿Alguna operación?
        </label>
        <select
          id="operacion"
          name="operacion"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.operacion}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.operacion === true && (
        <div className="mb-4 flex justify-between">
          <label className="mr-4 mb-1" htmlFor="detalleOperacion">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleOperacion"
            name="detalleOperacion"
            className="text-black rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleOperacion}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="problemasRespiratorios">
          Problemas respiratorios
        </label>
        <select
          id="problemasRespiratorios"
          name="problemasRespiratorios"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.problemasRespiratorios}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.problemasRespiratorios === true && (
        <div className="mb-4 flex justify-between">
          <label className="mr-4 mb-1" htmlFor="detalleRespiratorios">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleRespiratorios"
            name="detalleRespiratorios"
            className="text-black rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleRespiratorios}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="tiroides">
          Problema de tiroides
        </label>
        <select
          id="tiroides"
          name="tiroides"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.tiroides}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.tiroides === true && (
        <div className="mb-4 flex justify-between">
          <label className="mr-4 mb-1" htmlFor="detalleTiroides">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleTiroides"
            name="detalleTiroides"
            className="text-black rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleTiroides}
          />
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <label className="mr-4 mb-1" htmlFor="otros">
          ¿Otra enfermedad?
        </label>
        <select
          id="otros"
          name="otros"
          className="text-black rounded-lg outline-none"
          onChange={handleChange}
          value={formData.otros}
        >
          <option value="">Seleccione...</option>
          <option value={true}>Sí</option>
          <option value={false}>No</option>
        </select>
      </div>
      {formData.otros === true && (
        <div className="mb-4 flex justify-between">
          <label className="mr-4 mb-1" htmlFor="detalleTiroides">
            ¿Cuál?
          </label>
          <input
            type="text"
            id="detalleOtros"
            name="detalleOtros"
            className="text-black rounded-lg outline-none"
            onChange={handleChange}
            value={formData.detalleOtros}
          />
        </div>
      )}
      <div className="flex justify-center gap-3">
        <label>Consentimiento</label>
        <input
          type="checkbox"
          id="consentimiento"
          name="consentimiento"
          value={formData.consentimiento}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default MedicalHistoryForm;

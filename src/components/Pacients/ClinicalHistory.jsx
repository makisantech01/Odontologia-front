import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bottonWave from "../../assets/botton_wave.png";
import topWave from "../../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2"
library.add(faIdCard);

const ClinicalHistory = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const user = useSelector((state) => state.users.users);

  const [showCualInput, setShowCualInput] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setShowCualInput(selectedValue === "true");
  };

  const api = "https://api-sist-odontologico-production-889e.up.railway.app";

  const onSubmit = async (data) => {
    try {
      for (let key in data) {
        if (data[key] === "true") {
          data[key] = true;
        } else if (data[key] === "false") {
          data[key] = false;
        }
      }
      data.mesesEmbarazo === "" ? (data.mesesEmbarazo = 0) : data.mesesEmbarazo;
      console.log(data);
      const response = await axios.post(`${api}/historiales/${user}`, data);
      console.log(response.status)
      if (response.status === 200) {
        console.log(response);
        nav("/citas");
      }
      else{
        Swal.fire("Hubo un error al realizar la operación, verifique que los datos sean correctos.", "", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 h-[100vh] flex items-center justify-center">
      <div className=" flex flex-col justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className=" bg-primary p-4 rounded-3xl shadow-2xl z-10 w-[90vw] lg:w-[50vw] h-[90vh]">
          <h2 className="text-4xl font-bold text-center italic text-white mb-5">
            Historial Médico
          </h2>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex lg:flex-row flex-col w-100 lg:h-[27em] md:h-[29em] h-[24em] overflow-y-auto">
              <div className="flex flex-col lg:w-[50%] gap-7">
                {/* Enfermedades */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col w-full p-1 ">
                    <div className="flex self-center gap-12">
                      <label className="text-1xl text-white">
                        Enfermedades
                      </label>

                      <select
                        className="border rounded w-[3em]"
                        onChange={handleChange}
                        {...register("enfermedad", {
                          required: "Campo obligatorio",
                        })}
                        onBlur={() => handleBlur("enfermedad")}
                      >
                        <option value="">-</option>
                        <option value="true">SI</option>
                        <option value="false">NO</option>
                      </select>
                    </div>
                    <div className="w-full text-center">
                      {errors.enfermedad && (
                        <label className="h-0 text-red-500">
                          {errors.enfermedad.message}
                        </label>
                      )}
                    </div>
                  </div>
                  {watch("enfermedad") === "true" && (
                    <div className="flex flex-col items-center">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Cual?"
                        {...register("detalleEnfermedad", {
                          validate: (val) => {
                            if (watch("enfermedad") === "true" && !val) {
                              return "Debe aclarar que enfermedad/es";
                            }
                            return true;
                          },
                        })}
                        onBlur={() => handleBlur("detalleEnfermedad")}
                      />
                      {errors.detalleEnfermedad && (
                        <p className="h-0 text-red-500">
                          {errors.detalleEnfermedad.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Tratamiento Medico */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-3">
                    <label className="text-1xl text-white">
                      Tratamiento Médico
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("tratamientoMedico", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("tratamientoMedico")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.tratamientoMedico && (
                      <p className="h-0 text-red-500">
                        {errors.tratamientoMedico.message}
                      </p>
                    )}
                  </div>
                  {watch("tratamientoMedico") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Cual?"
                        {...register("detalleTratamiento", {
                          validate: (val) => {
                            if (watch("tratamientoMedico") == "true" && !val) {
                              return "Debe aclarar que tratamiento/s";
                            }
                            return true;
                          },
                        })}
                        onBlur={() => handleBlur("detalleTratamiento")}
                      />
                      {errors.detalleTratamiento && (
                        <p className="h-0 text-red-500">
                          {errors.detalleTratamiento.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Medicacion */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[4.5em]">
                    <label className="text-1xl text-white">Médicacion</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("medicacion", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("medicacion")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.medicacion && (
                      <p className="h-0 text-red-500">
                        {errors.medicacion.message}
                      </p>
                    )}
                  </div>
                  {watch("medicacion") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Cual?"
                        {...register("detalleMedicacion", {
                          validate: (val) => {
                            if (watch("medicacion") == "true" && !val) {
                              return "Debe aclarar que tratamiento/s";
                            }
                            return true;
                          },
                        })}
                        onBlur={() => handleBlur("detalleMedicacion")}
                      />
                      {errors.detalleMedicacion && (
                        <p className="h-0 text-red-500">
                          {errors.detalleMedicacion.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Alergia */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[6.5em]">
                    <label className="text-1xl text-white">Alergia</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("alergia", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("alergia")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.alergia && (
                      <p className="h-0 text-red-500">
                        {errors.alergia.message}
                      </p>
                    )}
                  </div>
                  {watch("alergia") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Cual?"
                        {...register("detalleAlergia", {
                          validate: (val) => {
                            if (watch("alergia") == "true" && !val) {
                              return "Debe aclarar que tratamiento/s";
                            }
                            return true;
                          },
                        })}
                        onBlur={() => handleBlur("detalleAlergia")}
                      />
                      {errors.detalleAlergia && (
                        <p className="h-0 text-red-500">
                          {errors.detalleAlergia.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Cicatrizacion */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[4em]">
                    <label className="text-1xl text-white">Cicatrización</label>
                    <select
                      className="border rounded w-[3em]"
                      {...register("cicatrizacion", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("cicatrizacion")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.cicatrizacion && (
                      <p className="h-0 text-red-500">
                        {errors.cicatrizacion.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Fiebre Reumatica */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-7">
                    <label className="text-1xl text-white">
                      Fiebre Reumática
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("fiebreReumatica", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("fiebreReumatica")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.fiebreReumatica && (
                      <p className="h-0 text-red-500">
                        {errors.fiebreReumatica.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Diabetes */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[6em]">
                    <label className="text-1xl text-white">Diabetes</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("diabetes", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("diabetes")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.diabetes && (
                      <p className="h-0 text-red-500">
                        {errors.diabetes.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Problemas Cardiacos */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-3">
                    <label className="text-1xl text-white">
                      Problemas Cardíacos
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("problemasCardiacos", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("problemasCardiacos")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.problemasCardiacos && (
                      <p className="h-0 text-red-500">
                        {errors.problemasCardiacos.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Aspirinas */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[6em]">
                    <label className="text-1xl text-white">Aspirinas</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("aspirinas", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("aspirinas")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.aspirinas && (
                      <p className="h-0 text-red-500">
                        {errors.aspirinas.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Tabaquismo */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[5em]">
                    <label className="text-1xl text-white">Tabaquismo</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("tabaquismo", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("tabaquismo")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.tabaquismo && (
                      <p className="h-0 text-red-500">
                        {errors.tabaquismo.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Embarazo */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[5.5em]">
                    <label className="text-1xl text-white">Embarazo</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("embarazo", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("embarazo")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.embarazo && (
                      <p className="h-0 text-red-500">
                        {errors.embarazo.message}
                      </p>
                    )}
                  </div>
                  {watch("embarazo") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="number"
                        placeholder="Meses de embarazo"
                        {...register("mesesEmbarazo", {
                          validate: (val) => {
                            if (watch("embarazo") === "true" && !val) {
                              return "Debe especificar los meses de embarazo";
                            }
                            return true;
                          },
                        })}
                        onBlur={() => handleBlur("mesesEmbarazo")}
                      />
                      {errors.mesesEmbarazo && (
                        <p className="h-0 text-red-500">
                          {errors.mesesEmbarazo.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:w-[50%] gap-7 ">
                {/* Hipertension */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[4em]">
                    <label className="text-1xl text-white">Hipertensión</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("hipertension", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("hipertension")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.hipertension && (
                      <p className="h-0 text-red-500">
                        {errors.hipertension.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Hipotension */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[4.5em]">
                    <label className="text-1xl text-white">Hipotensión</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("hipotension", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("hipotension")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.hipotension && (
                      <p className="h-0 text-red-500">
                        {errors.hipotension.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Problemas Renales */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-5">
                    <label className="text-1xl text-white">
                      Problemas Renales
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("problemasRenales", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("problemasRenales")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.problemasRenales && (
                      <p className="h-0 text-red-500">
                        {errors.problemasRenales.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Problemas Gastricos */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-2">
                    <label className="text-1xl text-white">
                      Problemas Gástricos
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("problemasGastricos", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("problemasGastricos")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.problemasGastricos && (
                      <p className="h-0 text-red-500">
                        {errors.problemasGastricos.message}
                      </p>
                    )}
                  </div>
                  {watch("problemasGastricos") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Detalle"
                        {...register("detalleGastricos")}
                        onBlur={() => handleBlur("detalleGastricos")}
                      />
                      {errors.detalleGastricos && (
                        <p className="h-0 text-red-500">
                          {errors.detalleGastricos.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Convulsiones */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-16">
                    <label className="text-1xl text-white">Convulsiones</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("convulsiones", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("convulsiones")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.convulsiones && (
                      <p className="h-0 text-red-500">
                        {errors.convulsiones.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Epilepsia */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[6em]">
                    <label className="text-1xl text-white">Epilepsia</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("epilepsia", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("epilepsia")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.epilepsia && (
                      <p className="h-0 text-red-500">
                        {errors.epilepsia.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Sifilis */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-2">
                    <label className="text-1xl text-white">
                      Sífilis, Gonorrea, VIH
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("sifilisGonorreaHIV", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("sifilisGonorreaHIV")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.sifilisGonorreaHIV && (
                      <p className="h-0 text-red-500">
                        {errors.sifilisGonorreaHIV.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Operaciones */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-[5.5em]">
                    <label className="text-1xl text-white">Operación</label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("operacion", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("operacion")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.operacion && (
                      <p className="h-0 text-red-500">
                        {errors.operacion.message}
                      </p>
                    )}
                  </div>
                  {watch("operacion") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Detalle"
                        {...register("detalleOperacion")}
                        onBlur={() => handleBlur("detalleOperacion")}
                      />
                      {errors.detalleOperacion && (
                        <p className="h-0 text-red-500">
                          {errors.detalleOperacion.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* Problemas Respiratorios */}
                <div className="flex flex-col gap-1">
                  <div className="flex self-center gap-3">
                    <label className="text-1xl text-white">
                      Problemas Respiratorios
                    </label>
                    <select
                      className="border rounded w-[3em]"
                      onChange={handleChange}
                      {...register("problemasRespiratorios", {
                        required: "Campo obligatorio",
                      })}
                      onBlur={() => handleBlur("problemasRespiratorios")}
                    >
                      <option value="">-</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </select>
                  </div>
                  <div className="w-full text-center">
                    {errors.problemasRespiratorios && (
                      <p className="h-0 text-red-500">
                        {errors.problemasRespiratorios.message}
                      </p>
                    )}
                  </div>
                  {watch("problemasRespiratorios") === "true" && (
                    <div className="flex flex-col items-center gap-3">
                      <input
                        className="border p-1 rounded w-[13em] outline-none"
                        type="text"
                        placeholder="Detalle"
                        {...register("detalleRespiratorios")}
                        onBlur={() => handleBlur("detalleRespiratorios")}
                      />
                      {errors.detalleRespiratorios && (
                        <p className="h-0 text-red-500">
                          {errors.detalleRespiratorios.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center px-5">
              <div className="flex items-center">
                <label className="text-1xl text-white">
                  Al registrarme, declaro que todos los datos proporcionados
                  respecto a mi estado de salud son verdaderos y que he
                  comprendido todas las explicaciones que se me han facilitado
                  en el lenguaje claro y sencillo. Se me aclararon todas las
                  dudas, por lo que estoy completamente de acuerdo con los
                  tratamientos que se me van a realizar.
                </label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="checkbox"
                  {...register("consentimiento", {
                    required: "Debe aceptar el consentimiento",
                  })}
                  defaultChecked={false}
                  onBlur={() => handleBlur("consentimiento")}
                  onClick={(e) => {
                    console.log(e.target.checked);
                  }}
                />
              </div>
              <div className="">
                {errors.consentimiento && (
                  <p className="h-0 text-red-500">
                    {errors.consentimiento.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="font-bold w-[8em] border-none rounded-2xl py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </button>
          </div>
        </form>
        <img
          src={bottonWave}
          className=" absolute z-[1] bottom-0 left-0 w-[40%]"
        />
      </div>
    </div>
  );
};

export default ClinicalHistory;

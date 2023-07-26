import React from "react";
import { useNavigate } from "react-router-dom";
import bottonWave from "../../assets/botton_wave.png";
import topWave from "../../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
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

  const api = "https://api-sist-odontologico-production.up.railway.app";

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
      if (response) {
        console.log(response);
        nav("/citas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 flex items-center justify-center">
      <div className=" flex flex-col justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className="w-[700px] mx-auto bg-primary p-4 rounded-3xl shadow-2xl z-10">
          <h2 className="text-6xl font-bold text-center italic text-white mb-[1.8em] mt-5">
            Historial Médico
          </h2>
          <div className="flex justify-center flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Enfermedades</label>
              <select
                className="border p-2 rounded w-[17em]"
                {...register("enfermedad", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("enfermedad")}
              >
                <option value="">-</option>
                <option value={true}>SI</option>
                <option value={false}>NO</option>
              </select>
            </div>
            {errors.enfermedad && (
              <p className="h-0 text-red-500">{errors.enfermedad.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleEnfermedad", {
                  validate: (val) => {
                    if (watch("enfermedad") == "true" && !val) {
                      return "Debe aclarar que enfermedad/es";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleEnfermedad")}
              />
            </div>
            {errors.detalleEnfermedad && (
              <p className="h-0 text-red-500">
                {errors.detalleEnfermedad.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Tratamiento Médico</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.tratamientoMedico && (
              <p className="h-0 text-red-500">
                {errors.tratamientoMedico.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
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
            </div>
            {errors.detalleTratamiento && (
              <p className="h-0 text-red-500">
                {errors.detalleTratamiento.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Medicación</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.medicacion && (
              <p className="h-0 text-red-500">{errors.medicacion.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleMedicacion", {
                  validate: (val) => {
                    if (watch("medicacion") == "true" && !val) {
                      return "Debe aclarar que medicacion/es";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleMedicacion")}
              />
            </div>
            {errors.detalleMedicacion && (
              <p className="h-0 text-red-500">
                {errors.detalleMedicacion.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Alergia</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.alergia && (
              <p className="h-0 text-red-500">{errors.alergia.message}</p>
            )}

            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleAlergia", {
                  validate: (val) => {
                    if (watch("alergia") == "true" && !val) {
                      return "Debe aclarar que alergia/s";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleAlergia")}
              />
            </div>
            {errors.detalleAlergia && (
              <p className="h-0 text-red-500">
                {errors.detalleAlergia.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Cicatrización</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.cicatrizacion && (
              <p className="h-0 text-red-500">{errors.cicatrizacion.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Fiebre Reumática</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.fiebreReumatica && (
              <p className="h-0 text-red-500">
                {errors.fiebreReumatica.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Diabetes</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.diabetes && (
              <p className="h-0 text-red-500">{errors.diabetes.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Problemas Cardíacos</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.problemasCardiacos && (
              <p className="h-0 text-red-500">
                {errors.problemasCardiacos.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Aspirinas</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.aspirinas && (
              <p className="h-0 text-red-500">{errors.aspirinas.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Anticoagulantes</label>
              <select
                className="border p-2 rounded w-[17em]"
                {...register("anticoagulante", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("anticoagulante")}
              >
                <option value="">-</option>
                <option value={true}>SI</option>
                <option value={false}>NO</option>
              </select>
            </div>
            {errors.anticoagulante && (
              <p className="h-0 text-red-500">
                {errors.anticoagulante.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Tabaquísmo</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.tabaquismo && (
              <p className="h-0 text-red-500">{errors.tabaquismo.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Embarazo</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.embarazo && (
              <p className="h-0 text-red-500">{errors.embarazo.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="number"
                min={0}
                max={9}
                placeholder="Cuantos Meses?"
                {...register("mesesEmbarazo", {
                  validate: (val) => {
                    if (watch("embarazo") == "true" && !val) {
                      return "Debe aclarar cuantos meses";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("mesesEmbarazo")}
              />
            </div>
            {errors.mesesEmbarazo && (
              <p className="h-0 text-red-500">{errors.mesesEmbarazo.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Hipertensión</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.hipertension && (
              <p className="h-0 text-red-500">{errors.hipertension.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Hipotensión</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.hipotension && (
              <p className="h-0 text-red-500">{errors.hipotension.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Problemas Renales</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.problemasRenales && (
              <p className="h-0 text-red-500">
                {errors.problemasRenales.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Problemas Gástricos</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.problemasGastricos && (
              <p className="h-0 text-red-500">
                {errors.problemasGastricos.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleGastricos", {
                  validate: (val) => {
                    if (watch("problemasGastricos") == "true" && !val) {
                      return "Debe aclarar que problema/s";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleGastricos")}
              />
            </div>
            {errors.detalleGastricos && (
              <p className="h-0 text-red-500">
                {errors.detalleGastricos.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Convulsiones</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.convulsiones && (
              <p className="h-0 text-red-500">{errors.convulsiones.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Epilepsia</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.epilepsia && (
              <p className="h-0 text-red-500">{errors.epilepsia.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">
                Sifilis? Gonorrea? HIV?
              </label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.sifilisGonorreaHIV && (
              <p className="h-0 text-red-500">
                {errors.sifilisGonorreaHIV.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Operaciones</label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.operacion && (
              <p className="h-0 text-red-500">{errors.operacion.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleOperacion", {
                  validate: (val) => {
                    if (watch("operacion") == "true" && !val) {
                      return "Debe aclarar que operacion/es";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleOperacion")}
              />
            </div>
            {errors.detalleOperacion && (
              <p className="h-0 text-red-500">
                {errors.detalleOperacion.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">
                Problemas Respiratorios
              </label>
              <select
                className="border p-2 rounded w-[17em]"
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
            {errors.problemasRespiratorios && (
              <p className="h-0 text-red-500">
                {errors.problemasRespiratorios.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleRespiratorios", {
                  validate: (val) => {
                    if (watch("problemasRespiratorios") == "true" && !val) {
                      return "Debe aclarar que problema/s";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleRespiratorios")}
              />
            </div>
            {errors.detalleRespiratorios && (
              <p className="h-0 text-red-500">
                {errors.detalleRespiratorios.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Tiroides</label>
              <select
                className="border p-2 rounded w-[17em]"
                {...register("tiroides", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("tiroides")}
              >
                <option value="">-</option>
                <option value={true}>SI</option>
                <option value={false}>NO</option>
              </select>
            </div>
            {errors.tiroides && (
              <p className="h-0 text-red-500">{errors.tiroides.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleTiroides", {
                  validate: (val) => {
                    if (watch("tiroides") == "true" && !val) {
                      return "Debe aclarar que tipo/s";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleTiroides")}
              />
            </div>
            {errors.detalleTiroides && (
              <p className="h-0 text-red-500">
                {errors.detalleTiroides.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Otros</label>
              <select
                className="border p-2 rounded w-[17em]"
                {...register("otros", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("otros")}
              >
                <option value="">-</option>
                <option value={true}>SI</option>
                <option value={false}>NO</option>
              </select>
            </div>
            {errors.otros && (
              <p className="h-0 text-red-500">{errors.otros.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-1xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Cual?"
                {...register("detalleOtros", {
                  validate: (val) => {
                    if (watch("otros") == "true" && !val) {
                      return "Debe aclarar que otro/s detalle/s";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("detalleOtros")}
              />
            </div>
            {errors.detalleOtros && (
              <p className="h-0 text-red-500">{errors.detalleOtros.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">
                Al registrarme, declaro que todos los datos proporcionados
                respecto a mi estado de salud son verdaderos y que he
                comprendido todas las explicaciones que se me han facilitado en
                el lenguaje claro y sencillo. Se me aclararon todas las dudas,
                por lo que estoy completamente de acuerdo con los tratamientos
                que se me van a realizar.
              </label>
              <input
                className="border p-2 rounded w-[17em]"
                type="checkbox"
                {...register("consentimiento", {
                  required: "Deber aceptar el consentimiento!",
                })}
                defaultChecked={false}
                onBlur={() => handleBlur("consentimiento")}
                onClick={(e) => {
                  console.log(e.target.checked);
                }}
              />
            </div>
            {errors.consentimiento && (
              <p className="h-0 text-red-500">
                {errors.consentimiento.message}
              </p>
            )}
          </div>
          <div className="flex justify-center py-1">
            <button
              className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
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

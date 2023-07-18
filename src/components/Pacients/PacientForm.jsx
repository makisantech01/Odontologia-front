import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bottonWave from "../../assets/botton_wave.png";
import topWave from "../../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIdCard,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../store/features/clientSlice";
library.add(faIdCard, faLock, faEnvelope);

const PacientForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const userType = useSelector((state) => state.users.type);
  const user = useSelector((state) => state.users.users);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      //   await dispatch(createClient(user, data));
      nav("/citas");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 h-screen flex items-center justify-center">
      <div className=" flex flex-col justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className="w-[500px] mx-auto bg-primary p-4 rounded-3xl shadow-2xl z-10">
          <h2 className="text-6xl font-bold text-center italic text-white mb-[1.8em] mt-5">
            Datos Personales
          </h2>
          <div className="flex justify-center flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                value={user}
                className="border p-2 rounded w-[17em]"
                {...register("dni", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("dni")}
                disabled
              />
            </div>
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Nombre"
                {...register("nombre", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("nombre")}
              />
            </div>
            {errors.nombre && (
              <p className="h-0 text-red-500">{errors.nombre.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Apellido"
                {...register("apellido", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("apellido")}
              />
            </div>
            {errors.apellido && (
              <p className="h-0 text-red-500">{errors.apellido.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="number"
                min={3}
                max={99}
                placeholder="Ingrese su edad"
                {...register("edad", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("edad")}
              />
            </div>
            {errors.edad && (
              <p className="h-0 text-red-500">{errors.edad.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="date"
                placeholder="Ingrese su fecha de Nacimiento"
                {...register("fechaNacimiento", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("fechaNacimiento")}
              />
            </div>
            {errors.fechaNacimiento && (
              <p className="h-0 text-red-500">
                {errors.fechaNacimiento.message}
              </p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Domicilio"
                {...register("domicilio", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("domicilio")}
              />
            </div>
            {errors.domicilio && (
              <p className="h-0 text-red-500">{errors.domicilio.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Localidad"
                {...register("localidad", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("localidad")}
              />
            </div>
            {errors.localidad && (
              <p className="h-0 text-red-500">{errors.localidad.message}</p>
            )}

            <input
              className="border p-2 rounded w-[17em]"
              type="text"
              value={0}
              disabled
              hidden
              {...register("nroHistoriaClinica")}
              onBlur={() => handleBlur("nroHistoriaClinica")}
            />

            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="email"
                placeholder="Ingrese su Email"
                {...register("email", {
                  required: "Campo obligatorio",
                  pattern: {
                    value:
                      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                    message: "Formato de email inválido",
                  },
                })}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {errors.email && (
              <p className="h-0 text-red-500">{errors.email.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="number"
                placeholder="Ingrese su telefono"
                {...register("telefono1", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^\d{8,15}$/,
                    message: "El telefono debe tener entre 8 y 15 números",
                  },
                })}
                onBlur={() => handleBlur("telefono1")}
              />
            </div>
            {errors.telefono1 && (
              <p className="h-0 text-red-500">{errors.telefono1.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="number"
                placeholder="Ingrese otro telefono"
                {...register("telefono2", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^\d{8,15}$/,
                    message: "El telefono debe tener entre 8 y 15 números",
                  },
                })}
                onBlur={() => handleBlur("telefono2")}
              />
            </div>
            {errors.telefono2 && (
              <p className="h-0 text-red-500">{errors.telefono2.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <select
                className="border p-2 rounded w-[17em]"
                placeholder="Seleccione su Obra Social"
                {...register("obraSocial", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("obraSocial")}
              >
                <option value="Particular">Particular</option>
                <option value="OSDE">OSDE</option>
                <option value="Medifé">Medifé</option>
                <option value="Swiss Medical">Swiss Medical</option>
                <option value="GALENO">GALENO</option>
              </select>
            </div>
            {errors.obraSocial && (
              <p className="h-0 text-red-500">{errors.obraSocial.message}</p>
            )}
          </div>
          <div className="flex justify-center py-1">
            <Link to={"/citas"}>
              <button
                className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
              >
                Guardar
              </button>
            </Link>
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

export default PacientForm;

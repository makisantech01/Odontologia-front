import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bottonWave from "../../assets/botton_wave.png";
import topWave from "../../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIdCard,
  faLock,
  faEnvelope,
  faUser,
  faCalendar,
  faHouse,
  faCity,
  faUserTie,
  faPhone,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../store/features/clientSlice";
import DateOfBirth from "./DateOfBirth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faIdCard, faLock, faEnvelope, faUser);

const PacientForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const userType = useSelector((state) => state.users.type);
  const user = useSelector((state) => state.users.users);
  console.log("el usuario --->", user);

  const onSubmit = async (data) => {
    try {
      const fechaNacimiento = new Date(data.fechaNacimiento);
      const dd = String(fechaNacimiento.getUTCDate()).padStart(2, "0");
      const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
      const yyyy = fechaNacimiento.getFullYear();

      // Crear la fecha en el formato deseado (dd/mm/yyyy)
      const fechaFormateada = `${dd}/${mm}/${yyyy}`;
      if (data.afiliado === "") {
        data.afiliado = 0;
      }

      // Actualizar el valor de la fecha de vencimiento en los datos
      const newData = { ...data, fechaNacimiento: fechaFormateada };
      console.log(newData);
      const response = await dispatch(createClient(newData));
      if (response) {
        console.log(response);
        nav("/historial-medico");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 flex items-center justify-center h-[100vh]">
      <form className="w-[900px] h-[700px] bg-primary p-5 mx-3 rounded-3xl shadow-2xl z-10">
        <h2 className="text-4xl font-bold text-center italic text-white pb-10">
          Datos Personales
        </h2>
        <div className="flex lg:flex-row md:flex-row flex-col h-[30em] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col lg:w-1/2 items-center gap-5 px-3 pt-5 ">
            <div className="flex justify-between w-full items-center">
              <label className="text-white ">DNI</label>
              <input
                defaultValue={toString(user)}
                className="border p-2 rounded w-[17em]"
                placeholder="Ingrese su DNI"
                {...register("dni", {
                  required: "Campo obligatorio",
                })}
                onBlur={() => handleBlur("dni")}
                readOnly
              />
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Nombre</label>
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
              <div className="ml-10">
                {errors.nombre && (
                  <label className=" h-0 text-red-500">
                    {errors.nombre.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Apellido</label>
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
              <div className="ml-10">
                {errors.apellido && (
                  <label className=" h-0 text-red-500">
                    {errors.apellido.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Edad</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Edad"
                  {...register("edad", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("edad")}
                />
              </div>
              <div className="ml-10">
                {errors.edad && (
                  <label className=" h-0 text-red-500">
                    {errors.edad.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Fecha</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Fecha de Nacimiento"
                  {...register("fechaNacimiento", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("fechaNacimiento")}
                />
              </div>
              <div className="ml-10">
                {errors.fechaNacimiento && (
                  <label className=" h-0 text-red-500">
                    {errors.fechaNacimiento.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Localidad</label>
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
              <div className="ml-10">
                {errors.localidad && (
                  <label className=" h-0 text-red-500">
                    {errors.localidad.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Email</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Email"
                  {...register("email", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("email")}
                />
              </div>
              <div className="ml-10">
                {errors.email && (
                  <label className=" h-0 text-red-500">
                    {errors.email.message}
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="flex  flex-col lg:w-1/2 items-center gap-5 px-3 pt-5 ">
            {/* <div className=" flex-row flex justify-center gap-2">
                <input
                  className="border p-2 rounded w-[17em]"
                  type="number"
                  defaultValue={0}
                  readOnly
                  hidden
                  {...register("nroHistoriaClinica")}
                  onBlur={() => handleBlur("nroHistoriaClinica")}
                />
                {errors.email && (
                  <p className="h-0 text-red-500">{errors.email.message}</p>
                )}
              </div> */}

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Ocupacion</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Ocupacion / Profesion"
                  {...register("ocupacion", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("ocupacion")}
                />
              </div>
              <div className="ml-10">
                {errors.ocupacion && (
                  <label className=" h-0 text-red-500">
                    {errors.ocupacion.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Telefono</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Numero de Telefono"
                  {...register("telefono1", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("telefono1")}
                />
              </div>
              <div className="ml-10">
                {errors.telefono1 && (
                  <label className=" h-0 text-red-500">
                    {errors.telefono1.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-between ">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Telefono 2</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese Otro Numero de Telefono"
                  {...register("nombre", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("nombre")}
                />
              </div>
              <div className="ml-10">
                {errors.nombre && (
                  <label className=" h-0 text-red-500">
                    {errors.nombre.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex  flex-row items-center gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <label className="text-white ">Obra social</label>
                <select
                  className="border p-2 rounded w-[17em] text-gray-400"
                  {...register("obraSocial", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("obraSocial")}
                  defaultValue="Hola"
                >
                  <option value="">Seleccione obra social</option>
                  <option value="Particular">Particular</option>
                  <option value="OSDE">OSDE</option>
                  <option value="Medifé">Medifé</option>
                  <option value="Swiss Medical">Swiss Medical</option>
                  <option value="GALENO">GALENO</option>
                </select>
                {errors.obraSocial && (
                  <p className="h-0 text-red-500">
                    {errors.obraSocial.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <label className="text-white ">Plan</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Plan"
                  {...register("plan", {
                    validate: (val) => {
                      if (watch("obraSocial") != "Particular" && !val) {
                        return "Campo obligatorio";
                      }
                      return true;
                    },
                  })}
                  onBlur={() => handleBlur("plan")}
                />
                {errors.plan && (
                  <p className="h-0 text-red-500">{errors.plan.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center gap-2 w-full">
              <div className="flex justify-between items-center w-full">
                <label className="text-white ">Titular</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese el titular"
                  {...register("titular", {
                    validate: (val) => {
                      if (watch("obraSocial") != "Particular" && !val) {
                        return "Campo obligatorio";
                      }
                      return true;
                    },
                  })}
                  onBlur={() => handleBlur("titular")}
                />
                {errors.titular && (
                  <p className="h-0 text-red-500">{errors.titular.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <label className="text-white ">N° de afiliado</label>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="number"
                  placeholder="Ingrese el numero de afiliado"
                  {...register("afiliado", {
                    validate: (val) => {
                      if (watch("obraSocial") != "Particular" && !val) {
                        return "Campo obligatorio";
                      }
                      return true;
                    },
                  })}
                  onBlur={() => handleBlur("afiliado")}
                />
                {errors.afiliado && (
                  <p className="h-0 text-red-500">{errors.afiliado.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1">
          <button
            className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white "
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PacientForm;

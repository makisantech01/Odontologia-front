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
  faIdCardClip
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
    <div className="bg-secondary-100 flex items-center justify-center h-auto">
      <div className=" flex flex-col justify-center">
        <form className="w-auto h-auto bg-primary p-5 m-1 rounded-3xl shadow-2xl z-10">
          <h2 className="text-4xl font-bold text-center italic text-white pb-10">
            Datos Personales
          </h2>
          <div className="flex lg:flex-row flex-row gap-10 h-[33em] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col items-center gap-7">
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon icon={faIdCard} />
                <div className="flex flex-col items-center">
                  <h1>DNI</h1>
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
              </div>
              <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <div className="flex flex-col items-center">
              <h1>Nombre</h1>
              <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Nombre"
                  {...register("nombre", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("nombre")}
                />
                {errors.nombre && (
                  <label className="bg-purple-500 h-0 text-red-500">
                    {errors.nombre.message}
                  </label>
                )}
              </div>
              
              </div>
              <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <div className="flex flex-col items-center">
              <h1>Apellido</h1>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Apellido"
                  {...register("apellido", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("apellido")}
                />
                {errors.apellido && (
                  <p className="h-0 text-red-500">{errors.apellido.message}</p>
                )} 
              </div>
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <div className="flex flex-col items-center">
              <h1>Edad</h1>
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
                {errors.edad && (
                  <p className="h-0 text-red-500">{errors.edad.message}</p>
                )}
              </div>
              </div>
              <div className="flex  flex-row items-center gap-2 w-full rounded">
              <FontAwesomeIcon icon={faCalendar} />
              <div className="flex flex-col items-center">
              <h1>Fecha de nacimiento</h1>
                <DateOfBirth />
                {errors.fechaNacimiento && (
                  <p className="h-0 text-red-500">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>
                
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faHouse} />
              <div className="flex flex-col items-center">
                  <h1>Domicilio</h1>
                  <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Domicilio"
                  {...register("domicilio", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("domicilio")}
                />
                {errors.domicilio && (
                  <p className="h-0 text-red-500">{errors.domicilio.message}</p>
                )}
              </div>
              
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faCity} />
              <div className="flex flex-col items-center">
              <h1>Localidad</h1>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Localidad"
                  {...register("localidad", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("localidad")}
                />
                {errors.localidad && (
                  <p className="h-0 text-red-500">{errors.localidad.message}</p>
                )}
              </div>
                
              </div>
            </div>
            <div className="flex  flex-col items-center gap-7">
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

              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <div className="flex flex-col items-center">
              <h1>Email</h1>
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
                {errors.email && (
                  <p className="h-0 text-red-500">{errors.email.message}</p>
                )}
              </div>
                
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faUserTie} />
              <div className="flex flex-col items-center">
              <h1>Ocupación/Profesión</h1>
                <input
                  className="border p-2 rounded w-[17em]"
                  type="text"
                  placeholder="Ingrese su Ocupación/Profesión"
                  {...register("ocupacion", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("ocupacion")}
                />
                {errors.ocupacion && (
                  <p className="h-0 text-red-500">{errors.ocupacion.message}</p>
                )} 
              </div>
               
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <div className="flex flex-col items-center">
              <h1>Numero de teléfono</h1>
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
                {errors.telefono1 && (
                  <p className="h-0 text-red-500">{errors.telefono1.message}</p>
                )}
              </div>
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <div className="flex flex-col items-center">
              <h1>Otro teléfono</h1>
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
                {errors.telefono2 && (
                  <p className="h-0 text-red-500">{errors.telefono2.message}</p>
                )}
              </div>
              </div>
              <div className="flex  flex-row items-center gap-2">
              <FontAwesomeIcon icon={faIdCardClip} />
              <div className="flex flex-col items-center">
              <h1>Obra social</h1>
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
              <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={faIdCardClip} />
              <div className="flex flex-col items-center">
              <h1>Plan</h1>
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
              <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} />
              <div className="flex flex-col items-center">
              <h1>Titular</h1>
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
              <div className="flex flex-row items-center gap-2">
                
                <FontAwesomeIcon icon={faIdCard} />
              <div className="flex flex-col items-center">
                  <h1>Numero de afiliado</h1>
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
              className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PacientForm;

import React, { useEffect } from "react";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIdCard,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClient,
  updateClient,
} from "../components/store/features/clientSlice";
import Sidebar from "../components/Sidebar";
library.add(faIdCard, faLock, faEnvelope);

const PatientData = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const user = useSelector((state) => state.users.users);
  const client = useSelector((state) => state.clients.selectedClient);

  const fechaNacimiento = new Date(client.fechaNacimiento);
  const dd = String(fechaNacimiento.getDate()).padStart(2, "0");
  const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
  const yyyy = fechaNacimiento.getFullYear();
  const fechaClienteFormateada = `${yyyy}-${mm}-${dd}`;
  console.log(fechaClienteFormateada);

  useEffect(() => {
    dispatch(fetchClient(user));
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const fechaNacimiento = new Date(data.fechaNacimiento);
      const dd = String(fechaNacimiento.getUTCDate()).padStart(2, "0");
      const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
      const yyyy = fechaNacimiento.getFullYear();

      // Crear la fecha en el formato deseado (dd/mm/yyyy)
      const fechaFormateada = `${dd}/${mm}/${yyyy}`;

      // Actualizar el valor de la fecha de vencimiento en los datos
      const newData = { ...data, fechaNacimiento: fechaFormateada };
      console.log(newData);
      const response = await dispatch(updateClient(newData));
      if (response) {
        console.log(response);
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
        <div className="lg:w-[20%] m-0 z-50">
          <Sidebar />
        </div>
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
                defaultValue={client.dni}
                className="border p-2 rounded w-[17em]"
                {...register("dni")}
                onBlur={() => handleBlur("dni")}
                readOnly
              />
            </div>
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                defaultValue={client.nombre}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Nombre"
                {...register("nombre")}
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
                defaultValue={client.apellido}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Apellido"
                {...register("apellido")}
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
                defaultValue={client.edad}
                className="border p-2 rounded w-[17em]"
                type="number"
                min={3}
                max={99}
                placeholder="Ingrese su edad"
                {...register("edad")}
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
                value={fechaClienteFormateada}
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
                defaultValue={client.domicilio}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Domicilio"
                {...register("domicilio")}
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
                defaultValue={client.localidad}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Localidad"
                {...register("localidad")}
                onBlur={() => handleBlur("localidad")}
              />
            </div>
            {errors.localidad && (
              <p className="h-0 text-red-500">{errors.localidad.message}</p>
            )}

            <input
              defaultValue={client.nroHistoriaClinica}
              className="border p-2 rounded w-[17em]"
              type="number"
              readOnly
              {...register("nroHistoriaClinica")}
              onBlur={() => handleBlur("nroHistoriaClinica")}
            />

            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-4xl text-white"
              />
              <input
                defaultValue={client.email}
                className="border p-2 rounded w-[17em]"
                type="email"
                placeholder="Ingrese su Email"
                {...register("email", {
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
                defaultValue={client.telefono1}
                className="border p-2 rounded w-[17em]"
                type="number"
                placeholder="Ingrese su telefono"
                {...register("telefono1", {
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
                defaultValue={client.telefono2}
                className="border p-2 rounded w-[17em]"
                type="number"
                placeholder="Ingrese otro telefono"
                {...register("telefono2", {
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
                defaultValue={client.obraSocial}
                className="border p-2 rounded w-[17em]"
                placeholder="Seleccione su Obra Social"
                {...register("obraSocial")}
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
            <button
              className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Actualizar
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

export default PatientData;

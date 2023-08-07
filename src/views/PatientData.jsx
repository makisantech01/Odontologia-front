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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
library.add(faIdCard, faLock, faEnvelope);

const PatientData = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const user = useSelector((state) => state.users.users);
  // const client = useSelector((state) => state?.clients?.selectedClient?.data);

  const client = {
    nombre: "Cristopher",
    domicilio: "RD",
    fechaNacimiento: "12/23/1997",
  };
  console.log("--->", client);

  useEffect(() => {
    dispatch(fetchClient(user));
  }, [dispatch, client]);

  const fechaPartida = client.fechaNacimiento.split("/");
  const fechaNacimiento = new Date(
    parseInt(fechaPartida[2]),
    parseInt(fechaPartida[1]),
    parseInt(fechaPartida[0])
  );
  const dd = String(fechaNacimiento.getDate()).padStart(2, "0");
  const mm = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
  const yyyy = fechaNacimiento.getFullYear();
  const fechaClienteFormateada = `${yyyy}-${mm}-${dd}`;

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

      const result = await Swal.fire({
        title: `¿Confirma las modificaciones?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await dispatch(updateClient(newData));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        console.log(response);
        nav("/citas");

        // Toast.fire({
        //   icon: "success",
        //   title: "Información actualizada con éxito!",
        // });
      }
    } catch (error) {
      console.error(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "Error al modificar la información!",
      });
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
              <label className="text-1xl text-white">DNI</label>
              <input
                defaultValue={client.dni}
                className="border p-2 rounded w-[17em]"
                {...register("dni")}
                onBlur={() => handleBlur("dni")}
                readOnly
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Nombre</label>
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
              <label className="text-1xl text-white">Apellido</label>
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
              <label className="text-1xl text-white">Edad</label>
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
              <label className="text-1xl text-white">Fecha de Nacimiento</label>
              <input
                defaultValue={fechaClienteFormateada}
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
              <label className="text-1xl text-white">Domicilio</label>
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
              <label className="text-1xl text-white">Localidad</label>
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
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">N° Historia Clínica</label>
              <input
                defaultValue={client.nroHistoriaClinica}
                className="border p-2 rounded w-[17em]"
                type="number"
                readOnly
                {...register("nroHistoriaClinica")}
                onBlur={() => handleBlur("nroHistoriaClinica")}
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Email</label>
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
              <label className="text-1xl text-white">Ocupación/Profesión</label>
              <input
                defaultValue={client.ocupacion}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Ocupación/Profesión"
                {...register("ocupacion")}
                onBlur={() => handleBlur("ocupacion")}
              />
            </div>
            {errors.ocupacion && (
              <p className="h-0 text-red-500">{errors.ocupacion.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Teléfono</label>
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
              <label className="text-1xl text-white">
                Teléfono Alternativo
              </label>
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
              <label className="text-1xl text-white">Obra Social</label>
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
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Plan</label>
              <input
                defaultValue={client.plan}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese su Plan"
                {...register("plan", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar que plan de obra social posee";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("plan")}
              />
            </div>
            {errors.plan && (
              <p className="h-0 text-red-500">{errors.plan.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">Titular</label>
              <input
                defaultValue={client.titular}
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="Ingrese el titular"
                {...register("titular", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar el titular de su obra social";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("titular")}
              />
            </div>
            {errors.titular && (
              <p className="h-0 text-red-500">{errors.titular.message}</p>
            )}
            <div className="flex items-center gap-6">
              <label className="text-1xl text-white">N° Afiliado</label>
              <input
                defaultValue={client.afiliado}
                className="border p-2 rounded w-[17em]"
                type="number"
                placeholder="Ingrese el numero de afiliado"
                {...register("afiliado", {
                  validate: (val) => {
                    if (watch("obraSocial") != "Particular" && !val) {
                      return "Debe aclarar el numero de afiliado de su obra social";
                    }
                    return true;
                  },
                })}
                onBlur={() => handleBlur("afiliado")}
              />
            </div>
            {errors.afiliado && (
              <p className="h-0 text-red-500">{errors.afiliado.message}</p>
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

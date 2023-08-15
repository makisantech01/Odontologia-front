import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/features/calendarSlice";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getAppointments,
  deleteAppointments,
} from "../store/features/appointmentsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchClient } from "../../components/store/features/clientSlice";

const AppointmentUser = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.calendar.calendarData);
  const dni = useSelector((state) => state.users.users);
  const allAppointments = useSelector(
    (state) => state.appointments.appointments
  );

  useEffect(() => {
    dispatch(fetchData());
    dispatch(getAppointments());
    dispatch(fetchClient(dni));
  }, [dispatch, dni]);

  //fecha actual
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;
  const currentTime = date.getHours();

  //filtra los dias disponibles pasadas las 12hs
  const filteredAppointments = appointments.filter((a) => {
    const currentDate = new Date();
    const dia = currentDate.getUTCDate();
    const mes = currentDate.getMonth() + 1;
    const año = currentDate.getFullYear();
    const currentDateISO = `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;

    // Convertir la fecha de "dd/MM/yyyy" a "yyyy-MM-dd"
    const [diaAp, mesAp, añoAp] = a.fecha.split("/");
    const appointmentDateISO = `${añoAp}-${mesAp.padStart(
      2,
      "0"
    )}-${diaAp.padStart(2, "0")}`;

    return (
      appointmentDateISO > currentDateISO ||
      appointmentDateISO !== currentDateISO
    );
  });

  const userAppointments = allAppointments.filter((a) => {
    return a.pacienteId === dni.toString() && a.fecha >= currentDateISO;
  });

  const handleSelectAppointment = async (date, time) => {
    const appointment = { fecha: date, hora: time };
    const appointmentsUrl =
      "https://api-sist-odontologico-production-889e.up.railway.app";

    if (userAppointments.length > 0) {
      await Swal.fire({
        title: `Usted ya tiene un turno asignado! Revise su casilla de mail`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else {
      const result = await Swal.fire({
        title: `¿Confirma el turno con fecha ${date} y hora ${time}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, reservar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        // const authUrl = `${appointmentsUrl}/google`;
        // // Abrir una nueva pestaña con la URL de autorización
        // await window.open(authUrl, "_blank");
        axios
          .post(`${appointmentsUrl}/turnos/${dni}`, appointment)
          .then((response) => {
            console.log("Response ->", response.data);
            dispatch(getAppointments());
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
              icon: "success",
              title: "Turno reservado con éxito!",
            });
          })
          .catch((error) => {
            console.error("Error ->", error);
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
              title: "Error al confirmar la reserva!",
            });
          });
      }
    }
  };

  const handleDelete = async (appointment) => {
    if (appointment.fecha === currentDateISO && currentTime >= 11) {
      await Swal.fire({
        title:
          "No se pueden cancelar turnos pasadas las 11hs de la misma fecha",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
        reverseButtons: false,
      });
    } else {
      const result = await Swal.fire({
        title: "¿Quieres cancelar este turno?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Cancelar",
        cancelButtonText: "No",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        dispatch(deleteAppointments(appointment.id));
      }
    }
  };

  return (
    <div className="flex flex-col h-[40em]">
      <ul className="gap-4 flex flex-col items-center py-3 bg-gray-300 text-black h-full lg:w-[50vw] w-[90vw] rounded-lg lg:rounded-2xl px-3 overflow-y-auto scrollbar-hide">
        {filteredAppointments.map((item, index) => (
          <div
            key={index}
            className="bg-primary font-semibold shadow-md rounded-lg p-5"
          >
            <label className="flex gap-4 text-2xl lg:px-10">
              <div>{item?.dia} </div>
              <div>{item?.fecha}</div>
            </label>
            <li
              key={item.fecha}
              className="item flex lg:justify-evenly lg:flex-row flex-col w-full"
            >
              <ul
                className=" gap-3 flex flex-wrap items-center justify-evenly text-black w-full rounded-lg lg:rounded-2xl overflow-y-auto scrollbar-hide cursor-pointer"
                name="hora"
              >
                {item?.horasDisponibles.map((h) => {
                  if (h.disponible) {
                    return (
                      <li
                        key={h.hora}
                        value={h.hora}
                        className="bg-gray-300 w-[40%] font-semibold my-2 shadow-md py-1 rounded-lg px-5 flex lg:justify-evenly lg:flex-row flex-col items-center"
                        onClick={() =>
                          handleSelectAppointment(item.fecha, h.hora)
                        }
                      >
                        {h.hora}
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          </div>
        ))}
      </ul>
      <ul className="flex flex-col justify-center items-center mt-4 bg-gray-300 text-black h-[10em] w-full rounded-lg lg:rounded-2xl py-5 px-3 overflow-y-auto scrollbar-hide">
        {userAppointments.length == 0 ? (
          <span className="text-2xl">No tienes turnos programados</span>
        ) : (
          <li
            key={userAppointments[0]?.id}
            className=" font-semibold mb-4 shadow-md bg-primary py-2 rounded-lg px-3 flex lg:justify-evenly lg:flex-row flex-col w-80 lg:w-full items-center"
          >
            <div>{userAppointments[0]?.pacienteId}</div>
            <div>{userAppointments[0].fecha}</div>
            <div>{userAppointments[0].hora}</div>
            <button
              value={userAppointments[0].id}
              onClick={() => handleDelete(userAppointments[0])}
            >
              <FontAwesomeIcon
                className="h-[1.5em] text-red-600 cursor-pointer"
                icon={faCircleXmark}
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AppointmentUser;

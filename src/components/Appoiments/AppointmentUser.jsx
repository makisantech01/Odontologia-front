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

const AppointmentUser = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.calendar.calendarData);
  const dni = useSelector((state) => state.users.users);
  const allAppointments = useSelector(
    (state) => state.appointments.appointments
  );

  //fecha actual
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;
  const currentTime = date.getHours();

  const userAppointments = allAppointments.filter((a) => {
    return a.pacienteId === dni.toString() && a.fecha >= currentDateISO;
  });

  useEffect(() => {
    dispatch(fetchData());
    dispatch(getAppointments());
  }, [dispatch]);

  const handleSelectAppointment = async (date, time) => {
    const appointment = { fecha: date, hora: time };
    const appointmentsUrl =
      "https://api-sist-odontologico-production.up.railway.app";

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
        const authUrl = `${appointmentsUrl}/google`;
        // Abrir una nueva pestaña con la URL de autorización
        await window.open(authUrl, "_blank");
        axios
          .post(`${appointmentsUrl}/turnos/${dni}`, appointment)
          .then((response) => {
            console.log("Response ->", response.data);
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
    <div className="flex flex-col lg:mx-[15vw] mx-4  h-[40em]">
      <ul className=" flex flex-col items-center mt-4 bg-gray-300 text-black h-[30em] w-full rounded-lg lg:rounded-2xl py-5 px-3 overflow-y-auto scrollbar-hide">
        {appointments.map((item) => (
          <li
            key={item.fecha}
            className=" font-semibold mb-4 shadow-md bg-primary py-2 rounded-lg px-5 flex lg:justify-evenly lg:flex-row flex-col lg:w-full"
          >
            <div>{item?.dia}</div>
            <div>{item?.fecha}</div>
            <ul
              className=" flex flex-col items-center mt-4 bg-gray-300 text-black w-full rounded-lg lg:rounded-2xl py-5 px-3 overflow-y-auto scrollbar-hide cursor-pointer"
              name="hora"
            >
              {item?.horasDisponibles.map((h) => {
                if (h.disponible) {
                  return (
                    <li
                      key={h.hora}
                      value={h.hora}
                      className=" font-semibold mb-4 shadow-md py-1 rounded-lg px-5 flex lg:justify-evenly lg:flex-row flex-col w-80 lg:w-full items-center"
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
        ))}
      </ul>
      <ul className=" flex flex-col items-center mt-4 bg-gray-300 text-black h-[10em] w-full rounded-lg lg:rounded-2xl py-5 px-3 overflow-y-auto scrollbar-hide">
        {userAppointments.length == 0 ? (
          <span>No tienes turnos programados</span>
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

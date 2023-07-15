import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/features/calendarSlice";
import DateFilter from "./DateFilter";
import Swal from "sweetalert2";
import axios from "axios";

const AppointmentUser = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.calendar.calendarData);
  const dni = useSelector((state) => state.users.users);
  console.log(dni);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSelectAppointment = async (date, time) => {
    const appointment = { fecha: date, hora: time };

    const appointmentsUrl =
      "https://api-sist-odontologico-production.up.railway.app/turnos";

    axios
      .post(`${appointmentsUrl}/${dni}`, appointment)
      .then((response) => {
        console.log("Response ->", response.data);
      })
      .catch((error) => {
        console.error("Error ->", error);
      });
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
    </div>
  );
};

export default AppointmentUser;

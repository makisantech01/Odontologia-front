import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "../store/features/clientSlice";
import DateFilter from "./DateFilter";
import { fetchData } from "../store/features/calendarSlice";
import axios from "axios";
import {
  getAppointments,
  deleteAppointments,
  cleanAppointments,
  postAppointment,
} from "../store/features/appointmentsSlice";
import Swal from "sweetalert2";

const AppoinmentList = ({setStartDate, startDate}) => {
  const [list, setList] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [dni, setDni] = useState("");
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  //fecha actual
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;

  const currentAppointments = appointments.filter((a) => {
    return a.fecha >= currentDateISO;
  });

  //eliminacion de turnos antiguos pasados los 2 meses
  appointments.map(async (a) => {
    const [day, month, year] = a.fecha.split("/");
    if (month < mes - 1) {
      await dispatch(cleanAppointments(a.id));
    }
  });

  const [values, setValues] = useState({
    dni: "",
    name: "",
    lastName: "",
    date: "",
    time: "",
  });

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);
  //post request
  const handlePost = async () => {
    const clientInfo = {
      dni: values.dni,
      fecha: values.date,
      hora: values.time,
      estado: true,
    };
    const response = await dispatch(postAppointment(clientInfo));
    if (response.type === "appointments/postAppointment/fulfilled") {
      setInputValue(""); // Limpia el valor del campo de entrada
      setSearchResult("");
      handleCreatePatient({
        name: "",
        lastName: "",
      });
      setDni("")
      setValues({
        dni: "",
        name: "",
        lastName: "",
        date: "",
        time: "",
      })
    }
  };

  const handleCreatePatient = React.useCallback(
    (patientInfo) => {
      setValues((prev) => ({ ...prev, ...patientInfo }));
    },
    [values]
  );

  const SearchRelatedPatient = async (e) => {
    e.preventDefault();
    try {
      if (dni !== "") {
        const response = await dispatch(fetchClient(dni));

        const result = response.payload.data;
        setSearchResult(`${result.nombre} ${result.apellido}`);
        handleCreatePatient({
          name: result.nombre,
          lastName: result.apellido,
        });
      }
      else{
        handleCreatePatient({
          name: "",
          lastName: "",
        });
        setSearchResult("")
        
      }
    } catch (error) {
      console.error("Error al buscar pacientes relacionados:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.dni) {
      setList((prev) => prev.concat(values));
    }
  };

  const handleInputValue = async (e) => {
    e.preventDefault();
    const event = e.target.value;
    setDni(event);
    setInputValue(event); // Actualiza el valor del estado inputValue
    handleCreatePatient({
      ...values,
      dni: event,
    });
  };
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Quieres eliminar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      dispatch(deleteAppointments(id));
    }
  };

  const handleSelectChanged = (e) => {
    e.preventDefault();

    handleCreatePatient({
      time: e.target.value,
    });
  };

  const optionsList = React.useMemo(() => {
    const sortedList = list
      .sort((a, b) => (a.time < b.time ? -1 : 1))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    return sortedList;
  }, [list]);

  return (
    <div className="flex flex-col lg:mx-[15vw] mx-4  h-[40em]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:w-full lg:flex-row bg-primary py-3 px-3 rounded-lg gap-3 justify-evenly items-center"
      >
        <input
          type="number"
          onBlur={SearchRelatedPatient}
          onChange={(e) => {
            handleInputValue(e);
          }}
          value={inputValue}
          className="px-2 py-2 rounded-lg w-[10em] pl-5 outline-none"
          placeholder="DNI..."
        />
        <div className="w-[18em] text-center">
          <p className="text-white  text-2xl w-auto">
            {searchResult.length > 0 && <span>{searchResult}</span>}
          </p>
        </div>

        <DateFilter
          onSelect={handleCreatePatient}
          handlePost={handlePost}
          handleSelectChanged={handleSelectChanged}
        />
      </form>
      <ul className=" flex flex-col items-center mt-4 bg-gray-300 text-black h-[30em] w-full rounded-lg lg:rounded-2xl py-5 px-3 overflow-y-auto scrollbar-hide">
        {currentAppointments.length > 0 ? (
          currentAppointments.map((item, index) => (
            <li
              key={index}
              className=" font-semibold mb-4 shadow-md bg-primary py-2 rounded-lg px-3 flex lg:justify-evenly lg:flex-row flex-col w-80 lg:w-full items-center"
            >
              <div>{item?.pacienteId}</div>
              <div>
                {item?.paciente?.nombre} {item?.paciente?.apellido}
              </div>

              <div>{item.fecha}</div>
              <div>{item.hora}</div>
              <button value={item.id} onClick={() => handleDelete(item.id)}>
                <FontAwesomeIcon
                  className="h-[1.5em] text-red-600 cursor-pointer"
                  icon={faCircleXmark}
                />
              </button>
            </li>
          ))
        ) : (
          <div className="text-2xl flex font-semibold h-[100%] items-center">
            <label>No hay Citas Registradas</label>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AppoinmentList;

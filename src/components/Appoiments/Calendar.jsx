import React, { useState } from "react";
import { add, format, setDate, sub } from "date-fns";
import Cell from "./Cell";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../store/features/clientSlice";
import { fetchData } from "../store/features/calendarSlice";

library.add(faCheck, faEdit, faTrash);

const Calendar = ({ value = new Date(), onChange }) => {
  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));
  const prevYear = () => onChange(sub(value, { years: 1 }));
  const nextYear = () => onChange(add(value, { years: 1 }));

  const [canUpdate, setCanUpDate] = useState(true);
  const [inputClients, setInputClients] = useState([]);
  const [relatedPatients, SetRelatedPatients] = useState([]);
  const [patientName, setPatientName] = useState({});
  const [dni, setDni] = useState("");
  const { data } = useSelector((state) => state.clients);
  const { calendarData } = useSelector((state) => state.calendar);
  const selectedClient = useSelector((state) => state.clients.selectedClient);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  React.useEffect(() => {
    const buscarPacientesRelacionados = async () => {
      try {
        const response = dispatch(fetchClients());
        const resultados = response.payload;
        SetRelatedPatients(resultados);
      } catch (error) {
        console.error("Error al buscar pacientes relacionados:", error);
      }
    };

    buscarPacientesRelacionados();
  }, [dni]);

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const [tableData, setTableData] = useState({});

  const handleClickDate = (index) => {
    const date = setDate(value, index);
    onChange(date);
  };

  const deleteClient = (id) => {
    if (client.id === id) {
      setClient({
        id: null,
        name: "",
        dni: "",
        currentDate: "",
        dayNumber: null,
        dayName: "",
        timeSlot: null,
      });
    }
  };

  const [client, setClient] = useState({
    id: null,
    name: "",
    dni: "",
    dayNumber: null,
    currentDate: "",
    dayName: "",
    timeSlot: null,
  });

  const filterClient = (value, id, sectionIndex) => {
    const client = data.find((client) => client.dni === value);
    if (!client) return;

    return client;

    // setPatientName((prevNames) => ({
    //   ...prevNames,
    //   [sectionIndex]: client ? client.nombre + " " + client.apellido : "",
    // }));
  };

  const handleInputValue = (e, sectionIndex, index, time) => {
    const event = e.target.value;
    const id = e.target.id;
    const client = filterClient(event, id, sectionIndex);

    if (event.length > 7) {
      e.target.value = event.slice(0, 8);
      filterClient(event, id, sectionIndex);
    }
    setInputClients((prevClients) => [
      ...prevClients,
      {
        id,
        index,
        time,
        sectionIndex,
        name: client?.nombre,
        lastName: client?.apellido,
      },
    ]);
  };

  const handleClient = () => {
    try {
      setClient({
        ...client,
      });
      const response = true;

      if (response) {
        setCanUpDate(false);
      }
    } catch (error) {
      alert("handleClient error ->", error);
    }
  };

  return (
    <main className="flex flex-col gap-3">
      <div className="text-center flex gap-3 justify-center bg-primary text-white font-bold">
        <Cell onClick={prevYear}>{"<<"}</Cell>
        <Cell onClick={prevMonth}>{"<"}</Cell>
        <Cell className="col-span-3">{format(value, "LLLL yyyy")}</Cell>
        <Cell onClick={nextMonth}>{">"}</Cell>
        <Cell onClick={nextYear}>{">>"}</Cell>
      </div>
      <div className="calendar-container w-[800px] h-[636px] border-t border-l overflow-auto scrollbar-hide">
        <table className="table w-full">
          <thead className="bg-primary sticky top-0">
            <tr className="text-white">
              <th>
                <div className="font-bold text-center">Fecha</div>
              </th>
              <th>
                <div className="font-bold text-center">Hora</div>
              </th>
              <th>
                <div className="font-bold text-center">DNI</div>
              </th>
              <th>
                <div className="font-bold text-center">Nombres</div>
              </th>
              <th>
                <div className="font-bold text-center">Opciones</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {calendarData?.data?.map((day, sectionIndex) => {
              return day.horasDisponibles.map((time, index) => {
                return (
                  <tr key={index} className="bg-[#D9D9D9]">
                    <td className="text-center">
                      {day.dia}
                      {"  "} {day.fecha}
                    </td>
                    <td className="text-center">{time.hora}</td>
                    <td className="hidden">{"dia"}</td>

                    <td>
                      <div className="flex gap-1 justify-center">
                        <input
                          id={index.toString()}
                          className="rounded-lg px-2"
                          type="number"
                          onChange={(e) => {
                            handleInputValue(e, sectionIndex, index, time);
                          }}
                          placeholder="Search..."
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <p>{inputClients[index]?.name}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1 justify-evenly">
                        <button onClick={() => handleClient()}>
                          <FontAwesomeIcon
                            icon="check"
                            className="text-green-600 text-2xl"
                          />
                        </button>
                        <button onClick={() => setCanUpDate(true)}>
                          <FontAwesomeIcon
                            icon="edit"
                            className="text-blue-600 text-2xl"
                          />
                        </button>
                        <button onClick={() => deleteClient(index)}>
                          <FontAwesomeIcon
                            icon="trash"
                            className="text-red-600 text-2xl"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Calendar;

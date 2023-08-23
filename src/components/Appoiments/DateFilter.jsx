import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import moment from "moment";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import { fetchData } from "../store/features/calendarSlice";
import { useDispatch } from "react-redux";
registerLocale("es", es);

function DateFilter({ onSelect, handlePost, handleSelectChanged }) {
  const [startDate, setStartDate] = useState();
  const newFormattedDate = moment(startDate)?.format("DD/MM/YYYY");
  const calendarData = useSelector((state) => state.calendar.calendarData);
  const [availableHours, setAvailableHours] = useState([]);
  const dispatch = useDispatch();

  const findDate = calendarData?.find(
    (date) => date?.fecha === newFormattedDate
  );

  const handleValueChange = async (newValue) => {
    const formattedDate = moment(newValue).format("DD/MM/YYYY");
    setStartDate(newValue);
    onSelect({ date: formattedDate });
  };

  return (
    <>
      <DatePicker
        locale="es"
        selected={startDate}
        onChange={handleValueChange}
        isClearable
        placeholderText="Agregar una fecha"
        className="text-center py-2 rounded-lg"
        minDate={new Date()}
        dateFormat="dd/MM/yyy"
        filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
      />
      <div className="flex gap-4">
        <select
          className="bg-secondary-100 text-white py-2 px-3 rounded-lg"
          defaultValue={"Hora"}
          onChange={handleSelectChanged}
        >
          <option value={"Hora"} disabled>
            Hora
          </option>
          {findDate?.horasDisponibles.map((hourData) => (
            <option
              key={hourData.hora}
              value={hourData.hora}
              disabled={!hourData.disponible}
            >
              {hourData.hora}
            </option>
          ))}
        </select>
        <button
          type="submit"
          onClick={() => {
            handlePost();
            setStartDate(null);
          }}
        >
          <FontAwesomeIcon
            className="h-[2.5em] text-green-800 bg-white rounded-full"
            icon={faCircleCheck}
          />
        </button>
      </div>
    </>
  );
}

export default DateFilter;

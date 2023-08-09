import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import moment from "moment";
registerLocale("es", es);

function DateFilter(props) {
  const { onSelect } = props;
  const [startDate, setStartDate] = useState();

  const handleValueChange = (newValue) => {
    const formattedDate = moment(newValue).format("DD/MM/YYYY");
    console.log("la fecha --->", formattedDate);
    setStartDate(newValue);
    onSelect({ date: formattedDate });
  };

  return (
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
  );
}

export default DateFilter;

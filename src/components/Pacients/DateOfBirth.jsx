import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import moment from "moment";
registerLocale("es", es);

function DateOfBirth(props) {
  const { onSelect } = props;
  const [startDate, setStartDate] = useState();

  const handleValueChange = (newValue) => {
    const formattedDate = moment(newValue).format("DD/MM/YYYY");
    setStartDate(newValue);
    onSelect({ date: formattedDate });
  };

  return (
    <DatePicker
      locale="es"
      selected={startDate}
      onChange={handleValueChange}
      isClearable
      placeholderText="dd/mm/aa"
      className="text-center py-2 rounded w-[17em]"
      dateFormat="dd/MM/yyy"
    />
  );
}

export default DateOfBirth;

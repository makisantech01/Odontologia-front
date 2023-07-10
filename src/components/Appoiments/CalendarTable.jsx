import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarTable = () => {
  const [date, setDate] = useState(new Date());

  const generateDaysArray = () => {
    const daysArray = [];
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = endDate.getDate();

    let currentDayOfWeek = startDate.getDay();
    let dayNumber = 1;

    if (currentDayOfWeek === 0) {
      currentDayOfWeek = 7;
    }

    while (dayNumber <= daysInMonth) {
      if (currentDayOfWeek > 1 && currentDayOfWeek < 7) {
        const currentDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          dayNumber
        );
        const dayName = currentDay.toLocaleDateString("default", {
          weekday: "long",
        });
        daysArray.push({ day: dayName, number: dayNumber });
        dayNumber++;
      } else {
        currentDayOfWeek = currentDayOfWeek === 7 ? 1 : currentDayOfWeek + 1;
      }
    }

    return daysArray;
  };

  const generateHoursArray = () => {
    const startTime = new Date().setHours(15, 0, 0, 0); // 3:00 PM
    const endTime = new Date().setHours(20, 0, 0, 0); // 8:00 PM
    const interval = 30; // 30 minutes

    const hoursArray = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const time = new Date(currentTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      hoursArray.push(time);
      currentTime += interval * 60 * 1000; // Convert minutes to milliseconds
    }

    return hoursArray;
  };

  const generateTableRows = () => {
    const daysArray = generateDaysArray();
    const hoursArray = generateHoursArray();

    // Generar filas de la tabla basadas en los datos de los appointments
    return daysArray.map((day) => {
      return hoursArray.map((hour, index) => (
        <tr key={`${day.number}-${index}`}>
          <td>{`${day.day} ${day.number}`}</td>
          <td>{hour}</td>
          <td>
            <input type="text" placeholder={`Nombre ${index + 1}`} />
          </td>
          <td>
            <input type="text" placeholder={`DNI ${index + 1}`} />
          </td>
        </tr>
      ));
    });
  };

  return (
    <div className="table-container ">
      <h2>
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </h2>
      <Calendar onChange={(date) => setDate(date)} value={date} />
      <div className="table-wrapper overflow-auto max-h-80">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora</th>
              <th>Nombre</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>{generateTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;

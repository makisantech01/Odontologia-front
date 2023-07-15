import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../components/store/features/usersSlice";
import Sidebar from "../components/Sidebar";
import AppoinmentList from "../components/Appoiments/AppoinmentList";
import DateFilter from "../components/Appoiments/DateFilter";
import { getAppointments } from "../components/store/features/appointmentsSlice";

const Citas = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const appointments = useSelector((state) => state.appointments);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleSetToday = () => setCurrentDate(new Date());

  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const currentDateISO = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${año}`;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100vw] m-0 flex justify-center items-center">
        <AppoinmentList />
      </div>
    </div>
  );
};

export default Citas;

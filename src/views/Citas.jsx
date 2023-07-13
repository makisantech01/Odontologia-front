import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../components/store/features/usersSlice";
import Calendar from "../components/Appoiments/Calendar";
import Button from "../components/Appoiments/Button";
import Sidebar from "../components/Sidebar";
import AppoinmentList from "../components/Appoiments/AppoinmentList";
import DateFilter from "../components/Appoiments/DateFilter";

const Citas = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleSetToday = () => setCurrentDate(new Date());

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="bg-secondary-100 flex flex-col h-[100vh] w-4/5">
        <div className="h-[100vh] flex items-center justify-center">
          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-center gap-4">
              {/* <Calendar value={currentDate} onChange={setCurrentDate} />
              <Button onClick={handleSetToday}>Hoy</Button> */}
              <AppoinmentList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citas;

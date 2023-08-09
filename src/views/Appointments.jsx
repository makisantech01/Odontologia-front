import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../components/store/features/usersSlice";
import Sidebar from "../components/Sidebar";
import AppoinmentList from "../components/Appoiments/AppoinmentList";
import AppointmentUser from "../components/Appoiments/AppointmentUser";

const Citas = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.users.type);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      {userType === true ? (
        <>
          <div className="lg:w-[20%] m-0">
            <Sidebar />
          </div>
          <div className="lg:w-[80%] w-[100vw] m-0 flex justify-center items-center">
            <AppoinmentList />
          </div>
        </>
      ) : (
        <>
          <div className="lg:w-[20%] m-0">
            <Sidebar />
          </div>
          <div className="lg:w-[80%] w-[100vw] m-0 flex justify-center items-center text-white">
            <AppointmentUser />
          </div>
        </>
      )}
    </div>
  );
};

export default Citas;

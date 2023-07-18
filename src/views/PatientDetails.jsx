import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClient,
  getUserById,
} from "../components/store/features/clientSlice";
import PatientMenu from "../components/PatientsDetails/PatientMenu";

const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedClient = useSelector((state) => state?.clients?.data);
  console.log("al info del cliente ->", selectedClient);

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch, id]);
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50">
        <Sidebar />
      </div>
      <div className="bg-secondary-100 flex flex-col h-[100vh] w-[100vw] justify-center overflow-auto items-center gap-6  mx-4">
        <header className="text-[#FB8C00] text-3xl font-bold pt-[3em] lg:pt-0">
          Juan Perez Ramirez
        </header>
        <div className="w-[100%] lg:w-[90%]">
          <PatientMenu />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

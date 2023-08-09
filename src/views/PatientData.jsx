import React from "react";
import Sidebar from "../components/Sidebar";
import PersonalDataForm from "../components/PatientViewComponents/PersonalDataForm/PersonalDataForm";

const PatientData = () => {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100vw] m-0 flex justify-center items-center">
        <PersonalDataForm />
      </div>
    </div>
  );
};

export default PatientData;

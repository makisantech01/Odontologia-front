import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import PatientMedicalHistory from "../components/PatientViewComponents/PatientMedicalHistory";
library.add(faIdCard);

const PatientHistory = () => {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100vw] m-0 flex justify-center items-center">
        {/* <PatientMedicalHistory /> */}
      </div>
    </div>
  );
};

export default PatientHistory;

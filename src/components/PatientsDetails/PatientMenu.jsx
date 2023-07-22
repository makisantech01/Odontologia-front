import { useState } from "react";
import Details from "./Options/Details";
import Odontogram from "./Options/Odontogram";
import PatientAppointment from "./Options/PatientAppointment";
import MedicalHistory from "./Options/MedicalHistory";

const Option = ({ title, active, onClick }) => {
  return (
    <button
      className={`px-2 lg:px-4 w-[100%] py-2 lg:text-lg ${
        active ? "bg-[#012542] text-white" : "text-gray-600 bg-[#14212A]"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const PatientMenu = () => {
  const [activeOption, setActiveOption] = useState("details");

  const renderComponent = () => {
    switch (activeOption) {
      case "details":
        return <Details />;
      case "map":
        return <Odontogram />;
      case "summary":
        return <PatientAppointment />;
      case "profile":
        return <MedicalHistory />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex lg:justify-start justify-center mt-4">
        <Option
          title="Detalles"
          active={activeOption === "details"}
          onClick={() => setActiveOption("details")}
        />
        <Option
          title="Odontograma"
          active={activeOption === "map"}
          onClick={() => setActiveOption("map")}
        />
        <Option
          title="Citas"
          active={activeOption === "summary"}
          onClick={() => setActiveOption("summary")}
        />
        <Option
          title="Historial Medico"
          active={activeOption === "profile"}
          onClick={() => setActiveOption("profile")}
        />
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default PatientMenu;

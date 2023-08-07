import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ClientTable from "../components/Pacients/ClientTable";
import SearchBar from "../components/Pacients/SearchBar";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50">
        <Sidebar />
      </div>
      <div className="bg-secondary-100 flex flex-col h-[100vh] w-[100vw] justify-center overflow-auto items-center gap-6  mx-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <ClientTable searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Patients;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ClientTable from "../components/Pacients/ClientTable";
import SearchBar from "../components/Pacients/SearchBar";
import AddButton from "../components/Pacients/AddButton";

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  return (
    <div className="flex bg-secondary-100">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="bg-secondary-100 flex flex-col h-[100vh] w-4/5 justify-center items-center gap-5">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <ClientTable searchTerm={searchTerm} />
        <AddButton />
      </div>
    </div>
  );
};

export default Pacientes;

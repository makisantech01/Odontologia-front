import React from "react";
import Sidebar from "../components/Sidebar";
const Inventario = () => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="bg-secondary-100 flex flex-col h-[100vh] w-4/5"></div>
    </div>
  );
};

export default Inventario;

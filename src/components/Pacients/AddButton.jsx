import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = () => {
  return (
    <button className="add-button bg-primary hover:bg-primary/80 px-2 py-2 rounded-xl text-white">
      <FontAwesomeIcon icon={faPlus} className="add-icon" />
      {"  "} Agregar
    </button>
  );
};

export default AddButton;

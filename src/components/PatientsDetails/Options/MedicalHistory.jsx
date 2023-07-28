import { useState } from "react";
import MedicalHistoryForm from "./MedicalHistoryForm";
import ModalH from "./ModalH";

const MedicalHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-[#012542] flex flex-col gap-4 justify-center items-center lg:h-[70vh] h-[36em] mb-6 text-lg text-white font-bold py-4 px-1 lg:px-4">
      <MedicalHistoryForm />
      <div className="justify-center flex">
        <button
          onClick={handleOpenModal}
          className="bg-green-700 hover:bg-green-500 py-2 px-4 rounded-lg"
        >
          Editar
        </button>
        <ModalH isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};
export default MedicalHistory;

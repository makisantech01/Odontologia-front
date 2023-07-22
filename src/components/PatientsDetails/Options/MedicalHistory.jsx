import MedicalHistoryForm from "./MedicalHistoryForm";

const MedicalHistory = () => {
  return (
    <div className="bg-[#012542] flex flex-col lg:flex-row lg:h-[70vh] h-[36em] mb-6 text-lg text-white font-bold py-4 px-1 lg:px-4">
      <MedicalHistoryForm />
    </div>
  );
};
export default MedicalHistory;

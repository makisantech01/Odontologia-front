import MHF from "./MHF";
import MedicalHistoryForm from "./MedicalHistoryForm";

const MedicalHistory = () => {
  return (
    <div className="bg-[#012542] flex flex-col  lg:flex-row lg:h-[70vh] text-lg text-white font-bold py-4 px-1 lg:px-4">
      {/* <MedicalHistoryForm /> */}
      <MHF />
    </div>
  );
};
export default MedicalHistory;

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAppointments, deleteAppointments } from "../../store/features/appointmentsSlice";
import { fetchClient } from "../../store/features/clientSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
const PatientAppointment = () => {

  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();

  const client = useSelector((state) => state?.clients?.selectedClient?.data);
  console.log("dni", client.dni);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  console.log("appointments",appointments)

   const PacientAppointment= appointments.filter(turno=>turno.pacienteId===client.dni)
   console.log("este es el turno filtrado",PacientAppointment)

   const AppointmentId=PacientAppointment.map(turno=> turno.id)
  console.log(AppointmentId)
   const onHandleDelete = async () => {
    const result = await Swal.fire({
      title:
        "¿Estás segur@ que quieres eliminar este turno? Esta acción no se puede deshacer.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      console.log(AppointmentId)
      const response= await dispatch(deleteAppointments(AppointmentId));
      console.log(response)
    }
  };

  return (
    <main className="bg-[#012542] flex flex-col items-center gap-5 lg:h-[70vh] text-lg text-white font-bold">
      <h1 className="text-white font-bold text-3xl underline mb-3">Turnos programados.</h1>
      {PacientAppointment.length > 0 ? (
  PacientAppointment.map((turno, index) => (
    <section
      key={index}
      className="bg-primary shadow-sm shadow-black justify-evenly flex flex-row h-max w-[80%] rounded-lg py-2"
    >
      <div className="flex flex-col items-center">
        <label className="text-black underline" htmlFor="">
          Fecha
        </label>
        <label className="text-black" htmlFor="">
          {turno.fecha}
        </label>
      </div>
      <div className="flex flex-col items-center">
        <label className="text-black underline" htmlFor="">
          Hora
        </label>
        <label className="text-black" htmlFor="">
          {turno.hora}
        </label>
      </div>
      <div className="flex cursor-pointer items-center">
        <FontAwesomeIcon
          onClick={onHandleDelete}
          icon="trash"
          className="text-red-600 text-2xl"
        />
      </div>
    </section>
  ))
) : (
  <section
     
      className="bg-primary text-black text-xl shadow-sm shadow-black justify-evenly flex flex-row h-max w-[80%] rounded-lg py-2"
    >
      No hay turnos programados con este cliente.
    </section>
)}
     
    </main>
  );
};

export default PatientAppointment;

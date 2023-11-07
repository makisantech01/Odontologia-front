import { Link } from "react-router-dom";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIdCard, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
library.add(faIdCard, faEnvelope);
const url = import.meta.env.VITE_ENDPOINT;

const PassRecovery = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${url}/solicitar-restablecimiento/${data.dni}`, {
          email: data.email,
        })
        .then(async (response) => {
          const result = await Swal.fire({
            title: "Link de recuperación enviado. Revise su casilla de correo!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
          if (result.isConfirmed) {
            nav("/");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 h-screen overflow-hidden flex items-center justify-center">
      <div className=" flex flex-col justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className="w-[500px] mx-auto bg-primary p-4 rounded-3xl shadow-2xl shadow-black z-10">
          <h2 className="text-6xl font-bold text-center italic text-white mb-[1.8em] mt-5">
            Recuperación de Contraseña
          </h2>
          <div className="flex justify-center flex-col items-center gap-10">
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="number"
                min="0"
                placeholder="Ingrese su DNI"
                {...register("dni", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "El DNI debe tener 8 números",
                  },
                })}
                onBlur={() => handleBlur("dni")}
              />
            </div>
            {errors.dni && (
              <p className="h-0 text-red-500">{errors.dni.message}</p>
            )}
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="email"
                placeholder="Ingrese su Email"
                {...register("email", {
                  required: "Campo obligatorio",
                  pattern: {
                    value:
                      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                    message: "Formato de email inválido",
                  },
                })}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {errors.email && (
              <p className="h-0 text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-center py-1">
            <Link to={"/"}>
              <button
                className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Enviar
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link to={"/"}>
              <button className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl">
                Atrás
              </button>
            </Link>
          </div>
        </form>
        <img
          src={bottonWave}
          className=" absolute z-[1] bottom-0 left-0 w-[40%]"
        />
      </div>
    </div>
  );
};

export default PassRecovery;

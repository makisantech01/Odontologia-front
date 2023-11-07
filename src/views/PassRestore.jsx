import { Link } from "react-router-dom";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
library.add(faLock, faEyeSlash, faEye);
const url = import.meta.env.VITE_ENDPOINT;

const PassRestore = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      await axios
        .post(`${url}/restablecer-contrasena`, {
          token,
          password: data.password,
        })
        .then(async (response) => {
          const result = await Swal.fire({
            title: "Contraseña restablecida con éxito!",
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
            Restablecer Contraseña
          </h2>
          <div className="flex justify-center flex-col items-center gap-10">
            <div className="flex items-center gap-6 flex-row">
              <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-white mr-2"
              />
              <div className="relative flex-grow">
                <input
                  className="border p-2 rounded w-[17em]"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password", {
                    required: "Campo obligatorio",
                  })}
                  onBlur={() => handleBlur("password")}
                />
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-6 flex-row">
              <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-white mr-2"
              />
              <div className="relative flex-grow">
                <input
                  className="border p-2 rounded w-[17em]"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("confirm_password", {
                    required: "Campo obligatorio",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Las contraseñas no coinciden";
                      }
                    },
                  })}
                  onBlur={() => handleBlur("confirm_password")}
                />
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xl cursor-pointer text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="h-0 text-red-500">{errors.password.message}</p>
            )}
            {errors.confirm_password && (
              <p className="h-0 text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <div className="flex justify-center py-1">
            <Link to={"/"}>
              <button
                className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Restablecer
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

export default PassRestore;

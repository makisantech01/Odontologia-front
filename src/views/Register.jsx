import React from "react";
import { Link } from "react-router-dom";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
library.add(faEnvelope, faLock);

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <div className="bg-secondary-100 h-screen flex items-center justify-center">
      <div className=" flex flex-col justify-center">
        <img src={topWave} className=" absolute z-[1] top-0 right-0 w-[40%]" />
        <form className="w-[500px] mx-auto bg-primary p-4 rounded-3xl shadow-2xl z-10">
          <h2 className="text-6xl font-bold text-center italic text-white mb-[1.8em] mt-5">
            Conident
          </h2>
          <div className="flex justify-center flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-4xl text-white"
              />
              <input
                className="border p-2 rounded w-[17em]"
                type="text"
                placeholder="ejemplo@gmail.com"
              />
            </div>
            <div className="flex items-center gap-6">
              <FontAwesomeIcon icon={faLock} className="text-4xl text-white" />
              <input
                className="border p-2 rounded w-[17em]"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="flex items-center gap-6">
              <FontAwesomeIcon icon={faLock} className="text-4xl text-white" />
              <input
                className="border p-2 rounded w-[17em]"
                type="password"
                placeholder="********"
              />
            </div>
            <span className="text-white hover:text-gray-200 cursor-pointer">
              Olvidaste tu contraseña?
            </span>
          </div>
          <div className="flex justify-center py-6">
            <Link to={"/"}>
              <button className="font-bold w-[8em] border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl">
                Registrarse
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

export default Register;

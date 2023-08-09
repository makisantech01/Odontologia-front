import { Link } from "react-router-dom";
import bottonWave from "../assets/botton_wave.png";
import topWave from "../assets/topwave.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faIdCard,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../components/store/features/usersSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

library.add(faIdCard, faLock, faEyeSlash, faEye);

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const loading = useSelector((state) => state.users.loading);

  console.log("este es el loading",loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(LoginUser(data));
      console.log("este es el resposne", response);
      if (response.type === "user/LoginUser/fulfilled") {
        nav("/citas");
      } 
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
        <form className="w-[500px] mx-auto bg-primary p-4 rounded-3xl shadow-black shadow-2xl z-10">
          <h2 className="text-6xl font-bold text-center italic underline text-white mb-[1.8em] mt-5">
            Conident
          </h2>
          <div className="flex justify-center flex-col items-center gap-10">
            <div className="flex items-center gap-6">
            
              <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faIdCard}
                className="text-4xl text-white"
              />
              <div className="flex flex-col items-center gap-2">
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
               {errors.dni && (
              <p className="h-0 text-red-500">{errors.dni.message}</p>
            )}
              </div>
              </div>
            </div>
           
            <div className="flex items-center gap-6 flex-row">
             
              <div className="relative flex-grow">
                <div className="flex flex-row items-center">
                <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-white mr-2"
              />
              <div className="flex flex-col items-center gap-2">
              <input
                  className="border p-2 rounded w-[17em]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
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
                 {errors.password && (
              <p className="h-0 text-red-500">{errors.password.message}</p>
            )}
              </div>
                </div>
              </div>
            </div>
           
            <span
              className="text-white hover:text-gray-200 cursor-pointer"
              onClick={() => nav("recuperacion-contraseña")}
            >
              Olvidaste tu contraseña?
            </span>
          </div>
          <div className="flex justify-center py-2">
            <button
              className="w-[7em] transition-all duration-300 ease-in-out border-none rounded-2xl my-5 py-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {loading === true ? "Cargando..." : "Ingresar"}
            </button>
          </div>
          <div className="flex justify-center">
            <Link to={"/registrarse"}>
              <button className="w-[7em] transition-all duration-300 ease-in-out border-none rounded-2xl p-3 bg-button-100 hover:bg-button-100/80 text-white text-2xl">
                Registro
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

export default Login;

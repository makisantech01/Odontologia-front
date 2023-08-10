import { useParams } from "react-router-dom";
import { fetchClient } from "../../store/features/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clientSelector } from "../../store/features/clientSlice";
const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useSelector((state) => state?.clients?.selectedClient?.data);
  console.log("cliente -->", client);
  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);
  return (
    <div className="bg-[#012542] flex flex-col lg:flex-row md:flex-row items-center lg:h-[70vh] text-lg text-white font-bold py-4">
      <div className="h-[100%] w-[50%] flex justify-center">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3">
          <li>
            <span className="mr-4">Historia clinica n:</span>
            <span className="text-gray-400">{client?.nroHistoriaClinica}</span>
          </li>
          <li>
            <span className="mr-4">DNI:</span>
            <span className="text-gray-400">{client?.dni}</span>
          </li>
          <li>
            <span className="mr-4">Fecha de nacimiento:</span>
            <span className="text-gray-400">{client?.fechaNacimiento}</span>
          </li>
          <li>
            <span className="mr-4">Edad:</span>
            <span className="text-gray-400">{client?.edad}</span>
          </li>
          <li>
            <span className="mr-4">Domicilio:</span>
            <span className="text-gray-400">{client?.domicilio}</span>
          </li>
          <li>
            <span className="mr-4">Localidad:</span>
            <span className="text-gray-400">{client?.localidad}</span>
          </li>
          <li>
            <span className="mr-4">Telefono de un familiar:</span>
            <span className="text-gray-400">{client?.telefono2}</span>
          </li>
        </ul>
      </div>
      <div className="h-[100%] w-[50%] flex justify-center">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3">
          <li>
            <span className="mr-4">Ocupacion / Profesion:</span>
            <span className="text-gray-400">{client?.ocupacion}</span>
          </li>
          <li>
            <span className="mr-4">Telefono del paciente:</span>
            <span className="text-gray-400">{client?.telefono1}</span>
          </li>
          <li>
            <span className="mr-4">Correo:</span>
            <span className="text-gray-400">{client?.email}</span>
          </li>
          <li>
            <span className="mr-4">Obra social:</span>
            <span className="text-gray-400">{client?.obraSocial}</span>
          </li>

          <li>
            <span className="mr-4">Plan:</span>
            <span className="text-gray-400">{client?.plan}</span>
          </li>
          <li>
            <span className="mr-4">Titular de la obra social:</span>
            <span className="text-gray-400">{client?.titular}</span>
          </li>
          <li>
            <span className="mr-4">N° de afiliado:</span>
            <span className="text-gray-400">{client?.afiliado}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Details;

import { useParams } from "react-router-dom";
import { fetchClient, updateClient } from "../../store/features/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clientSelector } from "../../store/features/clientSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
const Details = () => {
  const [edit, setEdit] = useState(false)
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useSelector((state) => state?.clients?.selectedClient?.data);
  const [nroHist, setNroHist] = useState(client?.nroHistoriaClinica)
  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);

  const onEdit = (()=>{
    setEdit(true)
  })

  const onCheck = ( async()=>{
    setEdit(false)
    const nroHistoriaClinica = nroHist
    const result = {...client, nroHistoriaClinica}
    const response = await dispatch(updateClient(result))
    console.log("este es result",result);
    console.log(response);
  })

  const onChange = ((e)=>{
    const event = e.target.value
    setNroHist(event)
  })

  return (
    <div className="bg-[#012542] flex flex-col lg:flex-row md:flex-row items-center h-[67vh] text-lg text-white font-bold py-4 overflow-y-auto">
      <div className="h-[100%] lg:w-[50%] w-full flex justify-center pb-2 ">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3 ">
          { edit == false ?
          (<li>
          <span className="mr-4">Historia clinica n:</span>
          <span className="text-gray-400">{client?.nroHistoriaClinica === null ? "N/A" : client?.nroHistoriaClinica }   <FontAwesomeIcon onClick={onEdit} className="cursor-pointer text-blue-500" icon={faEdit} />  </span>
        </li>)
        :
        (
          (<li>
            <span className="mr-4">Historia clinica n:</span>
            <input type="number" onChange={onChange} className="text-black" defaultValue={client?.nroHistoriaClinica} />
            <FontAwesomeIcon onClick={onCheck} className="cursor-pointer px-1 text-green-500" icon={faCheck} />
          </li>)
        )

          }
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
      <div className="h-[100%] lg:w-[50%] w-full flex justify-center">
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

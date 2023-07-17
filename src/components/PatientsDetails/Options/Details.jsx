const Details = () => {
  return (
    <div className="bg-[#012542] flex flex-col lg:flex-row lg:h-[70vh] text-lg text-white font-bold py-4">
      <div className="h-[100%] w-[50%]">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3">
          <li>Correo:</li>
          <li>Cel:</li>
          <li>Domicilio:</li>
          <li>Ocupacion / Profesion:</li>
          <li>Historia clinica n:</li>
          <li>Localidad:</li>
          <li>Plan:</li>
          <li>Edad:</li>
        </ul>
      </div>
      <div className="h-[100%] w-[50%]">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3">
          <li>N de afiliado:</li>
          <li>Motivo de consulta:</li>
          <li>Obra social:</li>
          <li>Titular de la obra social:</li>
          <li>DNI:</li>
          <li>Telefono de un familiar:</li>
          <li>Titular de obra social:</li>
          <li>Fecha de nacimiento:</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;

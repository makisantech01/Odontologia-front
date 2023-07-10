// import React, { useState } from "react";
// import { calendarData } from "../../utils/fakeData";

// export const Test = () => {
//   const [value, setValue] = useState("");
//   const [section, setSection] = useState(null);
//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setValue(value);
//   };
//   const buscar = (value, sectionIndex) => {
//     console.log(value, sectionIndex);
//     setSection(sectionIndex);
//   };
//   return (
//     <div className="w-[700px] bg-slate-50">
//       <table className="table w-full">
//         <thead className="bg-primary sticky top-0">
//           <tr className="text-white">
//             <th>
//               <div className="font-bold text-center">Día</div>
//             </th>
//             <th>
//               <div className="font-bold text-center">Hora</div>
//             </th>
//             <th>
//               <div className="font-bold text-center">DNI</div>
//             </th>
//             <th>
//               <div className="font-bold text-center">Nombres</div>
//             </th>
//             <th>
//               <div className="font-bold text-center">Opciones</div>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {calendarData.map((day, sectionIndex) => (
//             <tr key={sectionIndex}>
//               <td>
//                 <input type="text" onChange={handleInputChange} />
//                 <button
//                   className="bg-red-500"
//                   onClick={() => buscar(value, sectionIndex)}
//                 >
//                   dale
//                 </button>
//               </td>
//               <td>{sectionIndex == section ? value : null}</td>
//               <td>hola</td>
//               <td>hola</td>
//               <td>hola</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

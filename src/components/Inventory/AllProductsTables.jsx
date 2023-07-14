import { useTable, Column } from "react-table";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {useDispatch} from "react-redux"
import { deleteProducts } from "../store/features/inventorySlice";
import Swal from 'sweetalert2'
library.add(faCheck, faEdit, faTrash);

const AllProductsTables = ({ productos, handleEdit }) => {

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
      },
      {
        Header: "Lote",
        accessor: "lote",
      },
      {
        Header: "Fecha de vencimiento",
        accessor: "vencimiento",
      },
      {
        Header: "Stock Minimo",
        accessor: "stockMinimo",
      },
      {
        Header: "", // Empty header for the icons column
        accessor: "id", // Use a custom accessor for the icons column
        Cell: ({value, row }) => { // Render the icons in the cell
          const dispatch = useDispatch()
          const onHandleDelete = async () => {
            const result = await Swal.fire({
              title:"¿Estás segur@ que quieres eliminar este producto? Esta acción no se puede deshacer." ,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar',
              reverseButtons: true
            });
            if (result.isConfirmed) {
              dispatch(deleteProducts(value))
            }     
          };
          const onHandleEdit = () => {
            console.log(row.original);
            handleEdit(row.original);
          };
          return (
            <>
          <div className="flex flex-row gap-3">
          <button onClick={onHandleEdit} className="text-blue-700">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={onHandleDelete} className="text-red-600">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
            </>
          );
        },
      },
    ],
    [handleEdit]
  );

  const tableInstance = useTable({ columns, data: productos });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="max-h-96 w-full overflow-y-scroll scrollbar-thumb-primary scrollbar-rounded-full rounded-md scrollbar-track-slate-300 scrollbar-thin scrollbar-hide">
      <table {...getTableProps()} className="border-collapse w-full">
        {/* headers */}
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-4 bg-primary text-white font-medium uppercase text-sm border-r border-black"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* datos */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`bg-slate-300 py-2 px-4 border-b border-black text-sm ${
                        index !== row.cells.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllProductsTables;

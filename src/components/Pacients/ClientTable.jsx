import React from "react";
import { useTable, Column } from "react-table";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../store/features/clientSlice";

library.add(faCheck, faEdit, faTrash);

const ClientTable = ({ searchTerm }) => {
  const clients = useSelector((state) => state.clients);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const columns = React.useMemo(
    () => [
      { Header: "DNI", accessor: "dni" },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Celular", accessor: "telefono1" },
      {
        Header: "Opciones",
        accessor: "opciones",
        Cell: () => (
          <div className="flex gap-1 justify-evenly">
            <FontAwesomeIcon icon="check" className="text-green-600 text-2xl" />
            <FontAwesomeIcon icon="edit" className="text-blue-600 text-2xl" />
            <FontAwesomeIcon icon="trash" className="text-red-600 text-2xl" />
          </div>
        ),
      },
    ],
    []
  );

  const filteredRows = React.useMemo(() => {
    if (Array.isArray(clients)) {
      return clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [clients, searchTerm]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: clients.data || [] });

  return (
    <div className="calendar-container w-[800px] h-auto border-t border-l overflow-auto overflow-x-hidden scrollbar-thumb-primary scrollbar-rounded-full scrollbar-track-slate-300 scrollbar-thin">
      <table {...getTableProps()} className="table-auto w-[800px]">
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 font-semibold bg-primary text-white text-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="bg-[#D9D9D9]" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border px-4 py-2 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-white" colSpan={columns.length}>
                No se encontraron clientes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

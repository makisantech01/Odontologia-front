import React from "react";
import { useTable } from "react-table";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Add the imported icons to the library
library.add(faCancel);

const AppoinmentTable = ({ users }) => {
  const data = React.useMemo(() => users, [users]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Número",
        accessor: "phone",
      },
      {
        Header: "Fecha",
        accessor: "website",
      },
      {
        Header: "Hora",
        accessor: "id",
      },
      {
        Header: "",
        accessor: "icon",
        Cell: () => (
          <FontAwesomeIcon icon={faCancel} style={{ color: "red" }} />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="overflow-x-auto h-[90%] w-[72%]">
      <table className="bg-white min-w-full" {...getTableProps()}>
        <thead className="bg-primary text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ borderBottom: "1px solid black" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-auto bg-table-100" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-[10px]">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppoinmentTable;

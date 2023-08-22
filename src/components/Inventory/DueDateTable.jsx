import React from "react";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";

const DueDateTable = ({ productos }) => {
  const productosOrdenados = useMemo(() => {
    if (!productos) {
      return [];
    }

    return productos.slice().sort((a, b) => {
      const dateA = a.vencimiento.split("/").map(Number); // Convertir a números
      const dateB = b.vencimiento.split("/").map(Number); // Convertir a números

      // Comparar año, luego mes, luego día
      if (dateA[2] !== dateB[2]) {
        return dateA[2] - dateB[2];
      }
      if (dateA[1] !== dateB[1]) {
        return dateA[1] - dateB[1];
      }
      return dateA[0] - dateB[0];
    });
  }, [productos]);

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Fecha de vencimiento",
        accessor: "vencimiento",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: productosOrdenados,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="rounded-lg max-h-60 w-full overflow-y-scroll scrollbar-hide">
      <table {...getTableProps()} className="border-collapse w-full">
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 bg-primary text-white font-medium uppercase text-sm border-r-0 border-l border-t border-b border-black"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="bg-slate-300 py-2 px-4 border-b-0 border-l border-r border-black text-sm"
                  >
                    {cell.column.id === "vencimiento"
                      ? cell.value
                      : cell.render("Cell")}
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

export default DueDateTable;

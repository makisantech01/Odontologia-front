import { useTable, Column } from "react-table";
import { useMemo } from "react";

const AllProductsTables = ({productos}) => {
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
    ],
    []
  );

  const tableInstance = useTable({ columns, data: productos });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="max-h-80 w-full overflow-y-scroll scrollbar-thumb-primary scrollbar-rounded-full rounded-md scrollbar-track-slate-300 scrollbar-thin scrollbar-hide">
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
                  if (cell.column.id === "dueDate") {
                    const formattedDate = new Date(
                      cell.value
                    ).toLocaleDateString();
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`bg-slate-300 py-2 px-4 border-b border-black text-sm ${
                          index !== row.cells.length - 1 ? "border-r" : ""
                        }`}
                      >
                        {formattedDate}
                      </td>
                    );
                  } else {
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
                  }
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

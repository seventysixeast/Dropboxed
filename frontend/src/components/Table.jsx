import React from "react";
import { useTable } from "react-table";

const TableCustom = ({data, columns}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-body">
          <section id="pagination">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body card-dashboard">
                      <table
                        {...getTableProps()}
                        className="table table-striped search-api"
                      >
                        <thead className="table-inverse table-striped">
                          {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                  {column.render("Header")}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className="table-inverse table-striped">
                          {rows.map(row => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                  return (
                                    <td {...cell.getCellProps()}>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TableCustom;

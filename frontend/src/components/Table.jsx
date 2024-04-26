import React from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from "react-table";

const TableCustom = ({ data, columns }) => { 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageSize,
    setPageSize,
    pageCount,
    pageOptions,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: [{ id: columns[0].accessor, desc: true }]}
      
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-body">
          <section id="pagination">
            <div className="row">
              <div className="col-12">
                <div className="card pb-4">
                  <div className="card-content collapse show">
                    <div className="card-body card-dashboard dataTables_wrapper dt-bootstrap4">
                      <div className="d-flex justify-content-between" style={{ marginBottom: '5px', marginLeft: '0 !important' }}>
                        <div className="col-sm-12 col-md-5" style={{ marginLeft: '-15px' }}>
                          <span> Show{" "}
                            <select
                              value={pageSize}
                              onChange={(e) => setPageSize(Number(e.target.value))}
                              className="custom-select custom-select-sm form-control form-control-sm  w-25"
                            >
                              {[10, 25, 50, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                  Show {pageSize}
                                </option>
                              ))}
                            </select>
                            {" "}Entries
                          </span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <input
                            type="search"
                            className="form-control form-control-sm float-right w-25"
                            style={{ marginRight: '-16px' }}
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                          />
                        </div>
                      </div>
                      <table {...getTableProps()} className="tablealt-pagination dataTable table-inverse table-striped">
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                  {column.render("Header")}
                                  <span>
                                    {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-sort-desc"/> : <i className="fa fa-sort-asc"/>) : ''}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()} >
                          {page.map((row, i) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                    </div>
                  </div>
                  <div className="justify-content-between px-2 dataTables_wrapper dt-bootstrap4">
                    <div className="col-xs-12 col-sm-12 col-md-5">
                      <div className="dataTables_info" role="status" aria-live="polite">
                        Showing {(pageIndex * 10) + 1} to {Math.min((pageIndex + 1) * 10, data.length)} of {data.length} entries
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7 float-right">
                      <div className="dataTables_paginate paging_full_numbers float-right">
                        <ul className="pagination">
                          <li className={`paginate_button page-item first ${!canPreviousPage ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => gotoPage(0)}>First</button>
                          </li>
                          <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => previousPage()}>Previous</button>
                          </li>
                          {pageOptions.slice(Math.max(pageIndex - 1, 0), Math.min(pageIndex + 2, pageCount)).map((page, index) => (
                            <li key={index} className={`paginate_button page-item ${pageIndex === page ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => gotoPage(page)}>{page + 1}</button>
                            </li>
                          ))}
                          <li className="paginate_button page-item">
                            <input
                              type="text"
                              placeholder="..."
                              onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                              }}
                              className="page-link"
                              style={{ width: '50px', textAlign: 'center' }}
                            />
                          </li>


                          {pageCount > 2 && (
                            <>
                              <li className="paginate_button page-item">
                                <button className="page-link" onClick={() => gotoPage(pageCount - 2)}>{pageCount - 1}</button>
                              </li>
                              <li className="paginate_button page-item">
                                <button className="page-link" onClick={() => gotoPage(pageCount - 1)}>{pageCount}</button>
                              </li>
                            </>
                          )}


                          <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => nextPage()}>Next</button>
                          </li>
                          <li className={`paginate_button page-item last ${!canNextPage ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => gotoPage(pageCount - 1)}>Last</button>
                          </li>
                        </ul>
                      </div>
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

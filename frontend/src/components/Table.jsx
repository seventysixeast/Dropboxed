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
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const MAX_VISIBLE_PAGES = 5;

  const displayedPages = Math.min(MAX_VISIBLE_PAGES, pageCount);

  const startIndex = Math.max(
    Math.min(pageIndex - Math.floor(displayedPages / 2), pageCount - displayedPages),
    0
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
                      <div className="d-flex flex-wrap justify-content-between mb-2">
                        <div className="col-12 col-md-5 d-flex align-items-center mb-2 mb-md-0">
                          <span>
                            Show{" "}
                            <select
                              value={pageSize}
                              id="pageSize"
                              onChange={(e) => {
                                setPageSize(Number(e.target.value));
                              }}
                              className="custom-select custom-select-sm form-control form-control-sm w-auto"
                            >
                              {[10, 25, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                  Show {size}
                                </option>
                              ))}
                            </select>{" "}
                            Entries
                          </span>
                        </div>
                        <div className="col-12 col-md-2 d-flex justify-content-md-end">
                          <input
                            type="search"
                            className="form-control form-control-sm w-100 w-md-auto"
                            id="search"
                            name="search"
                            aria-controls="dataTable"
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                          />
                        </div>
                      </div>
                      {data.length > 0 ? (
                        <div style={{ overflowX: "auto" }}>
                          <table {...getTableProps()} className="tablealt-pagination dataTable table-inverse table-striped">
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                  {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-sort-desc" style={{ marginLeft: '10px' }} /> : <i className="fa fa-sort-asc" style={{ marginLeft: '10px' }} />) : ''}
                                      </span>
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                              {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell) => (
                                      <td {...cell.getCellProps()} key={cell.column.id}>
                                        {cell.render("Cell")}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <p>No data found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {data.length > 0 && (
                    <div className="justify-content-between px-2 dataTables_wrapper dt-bootstrap4">
                      <div className="col-xs-12 col-sm-12 col-md-5"></div>
                      <div className="col-sm-12 col-md-7 float-right">
                        <div className="dataTables_paginate paging_full_numbers">
                          <ul className="pagination">
                            <li className={`paginate_button page-item first ${!canPreviousPage ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => gotoPage(0)}>First</button>
                            </li>
                            <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`}>
                              <button className="page-link" onClick={() => previousPage()}>Previous</button>
                            </li>
                            {startIndex > 0 && (
                              <li className="paginate_button page-item disabled">
                                <button className="page-link">...</button>
                              </li>
                            )}
                            {pageOptions
                              .slice(startIndex, startIndex + displayedPages)
                              .map((page) => (
                                <li key={page} className={`paginate_button page-item ${pageIndex === page ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => gotoPage(page)}>{page + 1}</button>
                                </li>
                              ))}
                            {startIndex + displayedPages < pageCount && (
                              <li className="paginate_button page-item disabled">
                                <button className="page-link">...</button>
                              </li>
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
                  )}
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

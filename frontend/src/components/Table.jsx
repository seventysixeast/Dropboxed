import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import moment from "moment";

const TableCustom = ({ data, columns }) => {
  console.log(data);
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
    Math.min(
      pageIndex - Math.floor(displayedPages / 2),
      pageCount - displayedPages
    ),
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
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body card-dashboard dataTables_wrapper dt-bootstrap4">
                      <div
                        className="d-flex justify-content-between"
                        style={{
                          marginBottom: "15px",
                          marginLeft: "0 !important",
                        }}
                      >
                        <div
                          className="col-sm-12 col-md-5"
                          style={{ marginLeft: "-15px" }}
                        >
                          <span>
                            Show{" "}
                            <select
                              value={pageSize}
                              id="pageSize"
                              onChange={(e) => {
                                setPageSize(Number(e.target.value));
                              }}
                              className="custom-select custom-select-sm form-control form-control-sm w-25"
                            >
                              {[10, 25, 50, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                  Show {pageSize}
                                </option>
                              ))}
                            </select>{" "}
                            Entries
                          </span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <input
                            type="search"
                            className="form-control form-control-sm float-right w-25"
                            style={{ marginRight: "-16px" }}
                            name="search"
                            id="search"
                            value={globalFilter || ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                          />
                        </div>
                      </div>

                      <div style={{ overflowX: "auto" }}>
                        <table
                          {...getTableProps()}
                          className="tablealt-pagination dataTable table-inverse table-striped"
                        >
                          <thead>
                            {headerGroups.map(
                              (headerGroup, headerGroupIndex) => (
                                <tr
                                  {...headerGroup.getHeaderGroupProps()}
                                  key={headerGroupIndex}
                                >
                                  {headerGroup.headers.map((column) => (
                                    <th
                                      {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                      )}
                                      key={column.id}
                                    >
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted ? (
                                          column.isSortedDesc ? (
                                            <i
                                              className="fa fa-sort-desc"
                                              style={{ marginLeft: "10px" }}
                                            />
                                          ) : (
                                            <i
                                              className="fa fa-sort-asc"
                                              style={{ marginLeft: "10px" }}
                                            />
                                          )
                                        ) : (
                                          ""
                                        )}
                                      </span>
                                    </th>
                                  ))}
                                </tr>
                              )
                            )}
                          </thead>
                          <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()} key={row.id}>
                                  {row.cells.map((cell) => {
                                    return (
                                      <td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
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
                    </div>
                  </div>
                  <div className="justify-content-between px-2 dataTables_wrapper dt-bootstrap4">
                    <div className="col-xs-12 col-sm-12 col-md-5"></div>
                    <div className="col-sm-12 col-md-7 float-right">
                      <div className="dataTables_paginate paging_full_numbers float-right">
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item first ${
                              !canPreviousPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => gotoPage(0)}
                            >
                              First
                            </button>
                          </li>
                          <li
                            className={`paginate_button page-item previous ${
                              !canPreviousPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => previousPage()}
                            >
                              Previous
                            </button>
                          </li>
                          {startIndex > 0 && (
                            <li className="paginate_button page-item disabled">
                              <button className="page-link">...</button>
                            </li>
                          )}
                          {pageOptions
                            .slice(startIndex, startIndex + displayedPages)
                            .map((page) => (
                              <li
                                key={page}
                                className={`paginate_button page-item ${
                                  pageIndex === page ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => gotoPage(page)}
                                >
                                  {page + 1}
                                </button>
                              </li>
                            ))}
                          {startIndex + displayedPages < pageCount && (
                            <li className="paginate_button page-item disabled">
                              <button className="page-link">...</button>
                            </li>
                          )}
                          <li
                            className={`paginate_button page-item next ${
                              !canNextPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => nextPage()}
                            >
                              Next
                            </button>
                          </li>
                          <li
                            className={`paginate_button page-item last ${
                              !canNextPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => gotoPage(pageCount - 1)}
                            >
                              Last
                            </button>
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

import { useEffect, useState } from 'react';
import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TableCustom from "../components/Table";
import { getAllInvoices } from "./../api/invoiceApis";
import { useAuth } from "../context/authContext";

const Invoice = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const [invoiceList, setInvoiceList] = useState([]);

  const columns = [
    {
      Header: "Date",
      accessor: "updated_at",
      Cell: ({ value }) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString("en-Au", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        return (
          <div className="badge badge-pill badge-light-primary">
            {formattedDate}
          </div>
        );
      }
    },
    {
      Header: "Order #",
      accessor: "order_id",
    },
    {
      Header: "Client",
      accessor: "user_name",
    },
    // {
    //   Header: "Username",
    //   accessor: "user_name",
    // },
    {
      Header: "Address",
      accessor: "user_address",
    },
    {
      Header: "Amount",
      accessor: "total_price",
    },
    {
      Header: "Status",
      accessor: (row) => {
        const paidStatus = row.paid_status;
        const sendInvoice = row.send_invoice;
        if (paidStatus && sendInvoice) {
          return <p className="badge btn-success">Paid</p>;
        } else if (paidStatus) {
          return <p className="badge btn-success">Paid</p>;
        } else if (sendInvoice) {
          return <p className="badge btn-primary">Sent</p>;
        } else {
          return <p className="badge btn-orange">Pending</p>;
        }
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        const { original } = row;
        const { id, paid_status, send_invoice } = original;
        const isPaid = paid_status === 1;
        const isSent = send_invoice === 1;

        const handleEdit = () => {
          console.log("Edit invoice", id);
        };
        const handleDelete = () => {
          console.log("Delete invoice", id);
        };
        const handleUpload = () => {
          console.log("Upload invoice", id);
        };
        const handlePaid = () => {
          console.log("Paid invoice", id);
        };
        const handleSend = () => {
          console.log("Send invoice", id);
        };
        const handleDownload = () => {
          console.log("Download invoice", id);
        };

        return (
          <div className="align-items-center">
            <div>
            <button
              type="button"
              className="btn btn-icon btn-outline-primary"
              onClick={handleEdit}
              title="Edit Invoice"
            >
              <i className="feather white icon-edit"></i>
            </button>
            <button
              type="button"
              className="btn btn-icon btn-outline-primary"
              onClick={handleDelete}
              title="Delete Invoice"
            >
              <MdDelete fill='white' />
            </button>
            </div>
            <div>
            <button
              type="button"
              className="btn btn-icon btn-outline-primary"
              onClick={handleUpload}
            >
              <FaUpload fill='white' />
            </button>
            {!isPaid && (
              <button
                type="button"
                className="btn btn-icon btn-outline-primary text-white"
                onClick={handlePaid}
              >
                Paid
              </button>
            )}
            </div>
            {/* {!isSent && (
              <button
                className="btn btn-icon btn-light-warning btn-sm me-1"
                onClick={handleSend}
              >
                Send
              </button>
            )}

            <button
              className="btn btn-icon btn-light-secondary btn-sm"
              onClick={handleDownload}
            >
              Download
            </button> */}
          </div>
        );
      }
    },
  ];

  useEffect(() => {
    getInvoiceList();
  }, []);

  const getInvoiceList = async () => {
    try {
      const formData = new FormData();
      formData.append('role_id', roleId);
      formData.append('subdomain_id', subdomainId)
      const response = await getAllInvoices(formData);
      setInvoiceList(response);
    } catch (error) {
      console.error('Error fetching invoice list:', error);
    }
  }

  console.log(invoiceList);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-6 mb-2">
              <h3 className="content-header-title mb-0">Invoice List</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item">Invoices</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
              <a href="#" className="btn btn-outline-primary">Create Invoice</a>
            </div>
          </div>
          {/* <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Order #</th>
                        <th>Client</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2024-03-20</td>
                        <td>12345</td>
                        <td>John Doe</td>
                        <td>johndoe123</td>
                        <td>123 Main St, Cityville</td>
                        <td>$150</td>
                        <td>Shipped</td>
                        <td>
                          <a href="#">View Invoice</a>
                        </td>

                      </tr>
                      <tr>
                        <td>2024-03-21</td>
                        <td>67890</td>
                        <td>Jane Smith</td>
                        <td>janesmith456</td>
                        <td>456 Elm St, Townsville</td>
                        <td>$200</td>
                        <td>Processing</td>
                        <td>
                          <a href="#">View Invoice</a>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
      <TableCustom data={invoiceList} columns={columns} />
    </>
  );
};

export default Invoice;

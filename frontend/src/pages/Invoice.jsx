import { useEffect, useState } from "react";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  deleteInvoiceById,
  getAllInvoices,
  sendInvoice,
} from "./../api/invoiceApis";
import { useAuth } from "../context/authContext";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import TableCustom from "../components/TableInvoice";
import { verifyToken } from "../api/authApis";
import LoadingOverlay from "../components/Loader";
import EditInvoiceModal from "../components/EditInvoice";
import ReTooltip from "../components/Tooltip";

const Invoice = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const accesstoken = authData.token;
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceId, setInvoiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    resetData();
  };

  console.log(invoiceList);

  const resetData = async () => {
    setInvoiceId(null);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      },
      headerStyle: { width: "200px" },
    },
    {
      Header: "Order #",
      accessor: "order_id",
    },
    {
      Header: "Client",
      accessor: "user_name",
    },
    {
      Header: "Address",
      accessor: "user_address",
    },
    {
      Header: "Amount",
      accessor: (row) => `$${row.total_price}`,
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

        const isDisabled =
          roleId === 3 &&
          new Date(`${original.booking_date}T${original.booking_time}`) -
            new Date() <
            1000 * 60 * 60 * 3;

        return (
          <>
            <div className="btnsrow">
              <ReTooltip title="Edit Invoice" placement="top">
                <button
                  type="button"
                  className="btn btn-icon btn-outline-primary mr-1 mb-1"
                  style={{ padding: "0.5rem" }}
                  onClick={() => handleEdit(id)}
                  disabled={isDisabled}
                >
                  <i className="feather white icon-edit"></i>
                </button>
              </ReTooltip>
              <ReTooltip title="Delete Invoice" placement="top">
                <button
                  type="button"
                  className="btn btn-icon btn-outline-danger mr-1 mb-1"
                  style={{ padding: "0.5rem" }}
                  onClick={() => handleDelete(id)}
                  disabled={isDisabled}
                >
                  <i className="feather white icon-trash"></i>
                </button>
              </ReTooltip>
              <ReTooltip title="Upload Invoice" placement="top">
                <button
                  type="button"
                  className="btn btn-icon btn-outline-primary mr-1 mb-1"
                  style={{ padding: "0.5rem" }}
                  onClick={() => handleUpload(id)}
                  disabled={isDisabled}
                >
                  <FaUpload fill="white" />
                </button>
              </ReTooltip>
            {/* </div>
            <div className="btnsrow"> */}
              {!isPaid && (
                <ReTooltip title="Mark as Paid" placement="top">
                  <button
                    type="button"
                    className="btn btn-icon btn-outline-primary mr-1 mb-1 text-white"
                    style={{ padding: "0.5rem" }}
                    onClick={() => handlePaid(id)}
                    disabled={isDisabled}
                  >
                    Paid
                  </button>
                </ReTooltip>
              )}
              <ReTooltip title="Send Invoice" placement="top">
                <button
                  type="button"
                  className="btn btn-icon btn-outline-primary mr-1 mb-1"
                  style={{ padding: "0.5rem" }}
                  onClick={() => handleSendInvoice(id)}
                  disabled={isDisabled}
                >
                  <i className="icon-share"></i>
                </button>
              </ReTooltip>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getInvoiceList();
  }, []);

  const handleSendInvoice = async (id) => {
    try {
      const response = await sendInvoice({ invoiceId: id });
      if (response.success) {
        toast.success("Invoice sent successfully!");
        getInvoiceList();
      } else {
        toast.error("Failed to send invoice!");
      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("Failed to send invoice!");
    }
  };

  const getInvoiceList = async () => {
    setItemsLoading(true);
    try {
      const formData = new FormData();
      formData.append("role_id", roleId);
      formData.append("subdomain_id", subdomainId);
      const response = await getAllInvoices(formData);
      setInvoiceList(response.data);
    } catch (error) {
      console.error("Error fetching invoice list:", error);
    }
    setItemsLoading(false);
  };

  const deleteInvoice = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", invoiceId);
      const response = await deleteInvoiceById(formData);
      if (response.status === 200) {
        toast.success("Invoice deleted successfully!");
      }
      setShowDeleteModal(false);
      resetData();
      getInvoiceList();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
    setLoading(false);
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setInvoiceId(id);
    setModalIsOpen(true);
    setLoading(true);
  };

  const handleDelete = (id) => {
    console.log("Delete invoice", id);
    setInvoiceId(id);
    setShowDeleteModal(true);
  };

  const handleUpload = (id) => {
    console.log("Upload invoice", id);
  };

  const handlePaid = (id) => {
    console.log("Paid invoice", id);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accesstoken !== undefined) {
        let resp = await verifyToken(accesstoken);
        if (!resp.success) {
          toast.error("Session expired, please login again.");
          window.location.href = "/login";
        }
      }
    };

    fetchData();
  }, [accesstoken]);

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true);
    }
  }, [modalIsOpen]);

  return (
    <>
      <LoadingOverlay loading={loading} />
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
            {/* <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
              <a href="#" className="btn btn-outline-primary">
                Create Invoice
              </a>
            </div> */}
          </div>
        </div>
      </div>
      {invoiceList.length > 0 ? (
        <TableCustom data={invoiceList} columns={columns} />
      ) : (
        <>
          <div className="col-12 d-flex justify-content-center ">
            {itemsLoading ? (
              <div
                className="spinner-border primary"
                style={{ marginTop: "15rem" }}
                role="status"
              >
                <span className="sr-only"></span>
              </div>
            ) : (
              <p>No invoices found. Add invoice by clicking Create Invoice.</p>
            )}
          </div>
        </>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={deleteInvoice}
        message="Are you sure you want to delete this appointment?"
      />
      <EditInvoiceModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        invoiceId={invoiceId}
        handleLoading={handleLoading}
        isEdit={isEditMode}
        collectionId={null}
      />
    </>
  );
};

export default Invoice;

import { useEffect, useState } from "react";
import React from "react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  changePaidStatus,
  deleteInvoiceById,
  getAllInvoices,
  sendInvoice,
  updateInvoiceQuickbookLink
} from "./../api/invoiceApis";
import { useAuth } from "../context/authContext";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import TableCustom from "../components/TableInvoice";
import { verifyToken } from "../api/authApis";
import LoadingOverlay from "../components/Loader";
import EditInvoiceModal from "../components/EditInvoice";
import ReTooltip from "../components/Tooltip";
import UploadInvoiceModal from "../components/UploadInvoiceModal";
import ConfirmModal from "../components/ConfirmModal";

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
  const [showUploadModal, setShowUploadModal] = useState(false); // New state for upload modal
  const [quickbookLink, setQuickbookLink] = useState('');
  const [showPaidModal, setShowPaidModal] = useState(false);

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    resetData();
  };

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
      Header: "Invoice Id",
      accessor: "id",
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
    
        const paidBadge = paidStatus ? (
          <p className="badge btn-success">Paid</p>
        ) : (
          <p className="badge" style={{ backgroundColor: "rgb(255, 116, 140)" }}>Pending</p>
        );
    
        const invoiceBadge = sendInvoice ? (
          <p className="badge btn-primary">Sent</p>
        ) : null;
    
        return (
          <div style={{ display: 'flex', gap: '5px' }} >
            {paidBadge}
            {invoiceBadge}
          </div>
        );
      },
    },    
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        const { original } = row;
        const { id, paid_status, send_invoice, invoice_link, quickbooks_invoice_id } = original;
        const isPaid = paid_status === true;
        const isSent = send_invoice === true;
        const isQuickBookInvoiceAdded = quickbooks_invoice_id && quickbooks_invoice_id !== null ? true : false;

        const isDisabled =
          roleId === 3 &&
          new Date(`${original.booking_date}T${original.booking_time}`) -
          new Date() <
          1000 * 60 * 60 * 3;
        const disabledStyle = { pointerEvents: 'none', opacity: 0.6 };

        return (
          <>
            {roleId !== 3 ? (
              <div className="btnsrow">
                <ReTooltip title="Edit Invoice" placement="top">
                  <button
                    type="button"
                    className="btn btn-icon btn-outline-primary mr-1 mb-1"
                    style={{ padding: "0.5rem", ...(isSent ? disabledStyle : {}) }}
                    onClick={() => handleEdit(id)}
                    disabled={isSent}
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
                { isQuickBookInvoiceAdded && (
                  <ReTooltip title="Upload Invoice" placement="top">
                    <button
                      type="button"
                      className="btn btn-icon btn-outline-primary mr-1 mb-1"
                      style={{ padding: "0.5rem" }}
                      onClick={() => handleUpload(id, invoice_link)}
                    >
                      <FaUpload fill="white" />
                    </button>
                  </ReTooltip>
                )}

                <ReTooltip title="Mark as Paid" placement="top">
                  <button
                    type="button"
                    className="btn btn-icon btn-outline-primary mr-1 mb-1 text-white"
                    style={{ padding: "0.5rem", ...(isPaid ? disabledStyle : {}) }}
                    onClick={() => handlePaid(id)}
                    disabled={isPaid}
                  >
                    Paid
                  </button>
                </ReTooltip>
                <ReTooltip title="Send Invoice" placement="top">
                  <button
                    type="button"
                    className="btn btn-icon btn-outline-primary mr-1 mb-1"
                    style={{ padding: "0.5rem", ...(isSent ? disabledStyle : {}) }}
                    onClick={() => handleSendInvoice(id)}
                    disabled={isSent}
                  >
                    <FaPaperPlane fill="white" />
                  </button>
                </ReTooltip>
              </div>
            ) : (
              <ReTooltip title="View" placement="top">
                <button
                  type="button"
                  className="btn btn-icon btn-outline-primary mr-1 mb-1"
                  style={{ padding: "0.5rem" }}
                  onClick={() => handleView(id)}
                  disabled={isDisabled}
                >
                  <i className="fa icon-eye white"></i>
                </button>
              </ReTooltip>
            )}
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
      setLoading(true);
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
    setLoading(false);
  };

  const getInvoiceList = async () => {
    setItemsLoading(true);
    try {
      const formData = new FormData();
      formData.append("role_id", roleId);
      formData.append("subdomain_id", subdomainId);
      formData.append("user_id", user.id);
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

  const handleUpload = (id, invoiceLink) => {
    setInvoiceId(id);
    setQuickbookLink(invoiceLink);
    setShowUploadModal(true);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setQuickbookLink('');
    resetData();
  }

  const handlePaid = (id) => {
    setInvoiceId(id);
    setShowPaidModal(true);
  };

  const handlePaidClose = () => {
    setInvoiceId(null);
    setShowPaidModal(false);
  };

  const confirmPaidStatus = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", invoiceId);
      const response = await changePaidStatus(formData);
      if (response.status === 200) {
        toast.success("Invoice status updated successfully!");
      }
      setShowDeleteModal(false);
      resetData();
      getInvoiceList();
      setShowPaidModal(false);
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
    setLoading(false);

  }

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

  const handleQbLinkChange = (value) => {
    setQuickbookLink(value)
  }

  const handleLinkUpload = async () => {
    setLoading(true);
    const response = await updateInvoiceQuickbookLink({ invoiceId, invoiceLink: quickbookLink });
    if (response.success) {
      toast.success("Link saved successfully");
      resetData();
      setQuickbookLink('');
      setShowUploadModal(false);
      getInvoiceList();
    } else {
      toast.error(response.message)
    }
    setLoading(false);
  }
  const handleView = (id) => {
    setEditMode(true);
    setInvoiceId(id);
    setModalIsOpen(true);
    setLoading(true);
  };

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
        message="Are you sure you want to delete this Invoice?"
      />
      <EditInvoiceModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        invoiceId={invoiceId}
        handleLoading={handleLoading}
        isEdit={isEditMode}
        collectionId={null}
        refreshInvoiceList={getInvoiceList}
      />
      <ConfirmModal
        isOpen={showPaidModal}
        onClose={handlePaidClose}
        onConfirm={confirmPaidStatus}
        message="Do you wish to change the status to paid?"
      />
      <UploadInvoiceModal
        isOpen={showUploadModal}
        onClose={() => closeUploadModal()}
        quickbookLink={quickbookLink}
        handleConfirm={handleLinkUpload}
        handleQbLinkChange={handleQbLinkChange}
      />
    </>
  );
};

export default Invoice;

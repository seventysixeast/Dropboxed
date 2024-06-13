import React, { useState, useEffect } from "react";
import "./EditInvoiceModal.css";
import { getInvoiceData, updateInvoice } from "../api/invoiceApis";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
import { getOrderDataForInvoice, saveInvoice } from "../api/collectionApis";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const EditInvoiceModal = ({
  isOpen,
  onClose,
  invoiceId,
  handleLoading,
  isEdit,
  collectionId,
  getAllCollectionsData,
}) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [taxRate, setTaxRate] = useState(10);
  const [note, setNote] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const userId = user.id;
  const roleId = user.role_id;
  const accesstoken = authData.token;
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  useEffect(() => {
    if (isOpen && invoiceId) {
      const fetchInvoiceData = async () => {
        try {
          let dataToSend = new FormData();
          dataToSend.append("invoiceId", invoiceId);
          let response = await getInvoiceData(dataToSend);
          let itemsArray = response.data.itemsArray;
          setItems(itemsArray);
          setInvoiceData(response.data);
          setPaidAmount(response.data.invoice.paid_amount);
        } catch (err) {
          setError(err.message);
        }
        handleLoading();
      };
      fetchInvoiceData();
    } else if (isOpen && collectionId) {
      const fetchInvoiceData = async () => {
        try {
          const data = await getOrderDataForInvoice(collectionId);
          setInvoiceData(data.data);
          let initializedItems = (data.data.packages || []).map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));

          initializedItems.forEach((item) => {
            item.details = JSON.parse(item.details);
            item.details = item.details
              .map(
                (detail) =>
                  `${detail.image_type_count} ${detail.image_type_label}`
              )
              .join(", ");
          });
          initializedItems = initializedItems.map((item) => {
            const details = item.details;
            delete item.details;
            item.description = details;
            return item;
          });

          setItems(initializedItems);
          setClientName(data.data.client.name || "");
          setClientAddress(data.data.client.address || "");
        } catch (err) {
          setError(err.message);
        }
        handleLoading();
      };

      fetchInvoiceData();
    } else {
      setInvoiceData({
        invoice: {
          order_id: "",
          updated_at: new Date(),
        },
        client: {
          name: "",
          address: "",
          email: "",
          phone: "",
        },
        admin: {
          name: "",
          logo: "",
        },
      });
      setItems([
        { id: Date.now(), name: "", description: "", quantity: 1, price: 0 },
      ]);
      setPaidAmount(0);
      handleLoading();
    }
  }, [isOpen, invoiceId]);
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", description: "", quantity: 1, price: 0 },
    ]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.slice();
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTaxAmount = (subtotal) => {
    return subtotal / 11;
  };

  const calculateTotal = (subtotal, taxAmount) => {
    return subtotal; //+ taxAmount;
  };

  const resetData = () => {
    setItems([]);
    setTaxRate(10);
    setNote("");
    setInvoiceLink("");
    setPaidAmount(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount(subtotal);
    const total = calculateTotal(subtotal, taxAmount);

    const invoice = {
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      note,
      invoiceLink,
      clientName: invoiceData.client.name,
      clientAddress: invoiceData.client.address,
      dueAmount: total - paidAmount,
      paidAmount,
      subdomainId,
    };

    try {
      let response;
      if (isEdit) {
        invoice.invoiceId = invoiceId;
        invoice.orderId = invoiceData.invoice.order_id;
        response = await updateInvoice(invoice);
      } else {
        invoice.collectionId = collectionId;
        response = await saveInvoice(invoice);
      }

      if (response.success) {
        toast.success(
          `Invoice ${isEdit ? "updated" : "created"} successfully!`
        );
        getAllCollectionsData();
        resetData();
        onClose();
      } else {
        toast.error(`Failed to ${isEdit ? "update" : "create"} the invoice.`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while ${
          isEdit ? "updating" : "creating"
        } the invoice.`
      );
    }
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(parseFloat(e.target.value));
  };

  const subtotal = calculateSubtotal();
  const taxAmount = calculateTaxAmount(subtotal);
  const total = calculateTotal(subtotal, taxAmount);
  const dueAmount = total - paidAmount;
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      id="danger"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel10"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#DEE6EE" }}>
            <h5 className="modal-title">
              {isEdit ? "Edit Invoice" : "Add Invoice"}
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
            >
              <i className="feather icon-x" aria-hidden="true" />
            </button>
          </div>
          <div
            className="modal-body"
            style={{ overflowX: "hidden", overflowY: "auto" }}
          >
            <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
              {invoiceData && (
                <form onSubmit={handleSubmit}>
                  <div
                    className="modal-body"
                    style={{ overflowX: "hidden", overflowY: "auto" }}
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="card-header">
                          <div className="row">
                            {isEdit && (
                              <div className="col-xl-3 col-md-12 d-flex justify-content-start align-items-center pl-0">
                                <h6 className="invoice-text mr-1 font-weight-bold">
                                  Invoice#{" "}
                                </h6>
                                <input
                                  type="text"
                                  name="invoice"
                                  className="form-control w-50"
                                  value={invoiceId}
                                  readOnly
                                />
                              </div>
                            )}
                            <div className="col-xl-9 col-md-12 d-flex justify-content-xl-end align-items-lg-start align-items-sm-start align-items-xs-start align-items-center flex-wrap px-0 pt-xl-0 pt-1">
                              <div className="issue-date d-flex align-items-center justify-content-start mr-2 mb-75 mb-xl-0">
                                <h6 className="invoice-text mr-1 font-weight-bold">
                                  Date Issue
                                </h6>
                                <DatePicker
                                  className="form-control custom-datepicker mr-1"
                                  id="dateIssue"
                                  name="dateIssue"
                                  selected={
                                    invoiceData.invoice?.updated_at
                                      ? new Date(invoiceData.invoice.updated_at)
                                      : new Date()
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  required
                                />
                              </div>
                              <div className="due-date d-flex align-items-center justify-content-start">
                                <h6 className="invoice-text mr-1 font-weight-bold">
                                  Date Due
                                </h6>
                                <DatePicker
                                  className="form-control custom-datepicker mr-1"
                                  id="dateDue"
                                  name="dateDue"
                                  selected={new Date()}
                                  dateFormat="dd/MM/yyyy"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row my-2">
                          <div className="col-sm-6 col-12 order-2 order-sm-1">
                            <h4 className="invoice-title text-primary">
                              Invoice
                            </h4>
                            <input
                              type="text"
                              className="form-control"
                              value={invoiceData.admin.name || ""}
                            />
                          </div>
                          <div className="col-sm-6 col-12 order-1 order-sm-1 d-flex justify-content-end align-items-center">
                            <>
                              {invoiceData.admin.logo ? (
                                <img
                                  src={`${IMAGE_URL}/${invoiceData.admin.logo}`}
                                  alt="logo"
                                  height="auto"
                                  width={164}
                                />
                              ) : (
                                <span>{invoiceData.admin.subdomain}</span>
                              )}
                            </>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-lg-6 col-xl-6 col-xs-12 col-sm-12">
                            <div className="title-text">Bill To</div>
                            <div className="row">
                              <div className="col-12 col-xs-12 mb-1">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={invoiceData.client.name || ""}
                                  placeholder="Client Name"
                                />
                              </div>
                              <div className="col-12 col-xs-12 mb-1">
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  value={invoiceData.client.address || ""}
                                  placeholder="Address"
                                />
                              </div>
                              <div className="col-12 col-xs-12 mb-1">
                                <input
                                  type="email"
                                  className="form-control"
                                  value={invoiceData.client.email || ""}
                                  placeholder="Client Email"
                                />
                              </div>
                              <div className="col-12 col-xs-12 mb-1">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={invoiceData.client.phone || ""}
                                  placeholder="Client Phone"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="invoice-product-details">
                          <form className="repeater-form">
                            <div data-repeater-list="group-a">
                              <div className="table-responsive">
                                <table className="table table-bordered mt-3">
                                  <thead>
                                    <tr>
                                      <th>Item Name</th>
                                      <th>Description</th>
                                      <th>Quantity</th>
                                      <th>Price</th>
                                      <th>Total</th>
                                      {/* {roleId !== 3 && <th>Action</th>} */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, index) => (
                                      <tr key={item.id}>
                                        <td>
                                          <input
                                            type="text"
                                            id={`item-name-${index}`}
                                            name={`item-name-${index}`}
                                            className="form-control"
                                            value={item.name}
                                            onChange={(e) =>
                                              handleItemChange(
                                                index,
                                                "name",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            id={`item-description-${index}`}
                                            name={`item-description-${index}`}
                                            className="form-control"
                                            value={item.description}
                                            onChange={(e) =>
                                              handleItemChange(
                                                index,
                                                "description",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            id={`item-quantity-${index}`}
                                            name={`item-quantity-${index}`}
                                            className="form-control"
                                            value={item.quantity}
                                            onChange={(e) =>
                                              handleItemChange(
                                                index,
                                                "quantity",
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            id={`item-price-${index}`}
                                            name={`item-price-${index}`}
                                            className="form-control"
                                            value={item.price}
                                            onChange={(e) =>
                                              handleItemChange(
                                                index,
                                                "price",
                                                parseFloat(e.target.value)
                                              )
                                            }
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            className="form-control"
                                            value={item.quantity * item.price}
                                            readOnly
                                          />
                                        </td>
                                        {/* {roleId !== 3 && (
                                          <td>
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={() => deleteItem(index)}
                                              disabled={items.length === 1}
                                              style={{
                                                backgroundColor: "#f44336",
                                                color: "white",
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        )} */}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {/* roleId !== 3 && (
                              <div className="form-group">
                                <button
                                  className="btn btn-primary mt-1"
                                  type="button"
                                  onClick={addItem}
                                >
                                  <i className="feather icon-plus-circle common-size" />{" "}
                                  Add Item
                                </button>
                              </div>
                            ) */}
                          </form>
                        </div>
                        <hr />
                        <div className="invoice-total">
                          <div className="row justify-content-between">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-5">
                              <div className="regarding-payment form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={invoiceData.invoice?.paid_status || ""}
                                />
                              </div>
                              <div className="regarding-discount form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="Happy to give you a 10% discount."
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-5 offset-xl-2">
                              <ul className="list-group cost-list">
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">
                                    Subtotal{" "}
                                  </span>
                                  <span className="cost-value">
                                    ${subtotal.toFixed(2)}
                                  </span>
                                </li>
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">Tax </span>
                                  <span className="cost-value">{taxRate}%</span>
                                </li>
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">
                                    Tax Amount{" "}
                                  </span>
                                  <span className="cost-value">
                                    ${taxAmount.toFixed(2)}
                                  </span>
                                </li>
                                <li className="dropdown-divider" />
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">
                                    Invoice Total{" "}
                                  </span>
                                  <span className="cost-value">
                                    ${total.toFixed(2)}
                                  </span>
                                </li>
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">
                                    Amount Paid
                                  </span>
                                  <span className="cost-value">
                                    -${paidAmount.toFixed(2)}
                                  </span>
                                </li>
                                <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                                  <span className="cost-title mr-2">
                                    Balance (USD){" "}
                                  </span>
                                  <span className="cost-value">
                                    ${dueAmount.toFixed(2)}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      {isEdit ? "Save Invoice" : "Create Invoice"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceModal;

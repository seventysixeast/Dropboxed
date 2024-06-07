import React, { useState, useEffect } from "react";
import "./EditInvoiceModal.css";
import { getInvoiceData, updateInvoice } from "../api/invoiceApis";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
const IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const EditInvoiceModal = ({ isOpen, onClose, invoiceId, handleLoading }) => {
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
  const accesstoken = authData.toke;

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
    return (subtotal * taxRate) / 100;
  };

  const calculateTotal = (subtotal, taxAmount) => {
    return subtotal + taxAmount;
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
      invoiceId,
      orderId: invoiceData.invoice.order_id,
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
    };

    try {
      const response = await updateInvoice(invoice);
      if (response.success) {
        toast.success("Invoice updated successfully!");
        resetData();
        onClose();
      } else {
        toast.error("Failed to update the invoice.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the invoice.");
    }
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(e.target.value);
  };

  const subtotal = calculateSubtotal();
  const taxAmount = calculateTaxAmount(subtotal);
  const total = calculateTotal(subtotal, taxAmount);
  const dueAmount = total - paidAmount;

  return (
    <div
      id="edit-invoice-modal"
      className={`modal ${isOpen ? "fade show" : "fade"}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#DEE6EE" }}>
            <h5 className="modal-title">Edit Invoice </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {invoiceData?.collection?.id && (
            <form onSubmit={handleSubmit}>
              <div>
                {/* <div className="modal-body" style={{ overflowX: "hidden" }}>
                <div className="row">
                  <div className="col-md-6">
                    <h4>From,</h4>
                    <p>
                      {invoiceData.admin.account_name}
                      <br />
                      {invoiceData.admin.address}
                      <br />
                      {invoiceData.admin.phone}
                      <br />
                      {invoiceData.admin.email}
                      <br />
                      {invoiceData.admin.abn_acn}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h4>To,</h4>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Client Name"
                        value={invoiceData.client.name}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Client Address"
                        value={invoiceData.client.address}
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
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
                                handleItemChange(index, "name", e.target.value)
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="notes">Notes:</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    rows="3"
                    placeholder="Your Notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="invoice-link">Invoice Link:</label>
                  <input
                    type="text"
                    id="invoice-link"
                    name="invoice-link"
                    className="form-control"
                    value={invoiceLink}
                    onChange={(e) => setInvoiceLink(e.target.value)}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Subtotal:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          className="form-control"
                          value={subtotal.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Tax Rate:
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            value={taxRate}
                            onChange={(e) =>
                              setTaxRate(parseFloat(e.target.value))
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Tax Amount:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          className="form-control"
                          value={taxAmount.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">Total:</label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          className="form-control"
                          value={total.toFixed(2)}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Amount Paid:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          className="form-control"
                          value={paidAmount}
                          onChange={handlePaidAmountChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Amount Due:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          className="form-control"
                          value={dueAmount}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save Invoice
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
              </div> */}
              </div>
              <div className="modal-body" style={{ overflowX: "hidden" }}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-xl-3 col-md-12 d-flex justify-content-start align-items-center pl-0">
                          <h6 className="invoice-text mr-1 font-weight-bold">
                            Invoice#{" "}
                          </h6>
                          <input
                            type="text"
                            name="invoice"
                            className="form-control w-50"
                            value={invoiceId}
                          />
                        </div>
                        <div className="col-xl-9 col-md-12 d-flex justify-content-xl-end align-items-lg-start align-items-sm-start align-items-xs-start  align-items-center flex-wrap px-0 pt-xl-0 pt-1">
                          <div className="issue-date d-flex align-items-center justify-content-start mr-2 mb-75 mb-xl-0">
                            <h6 className="invoice-text mr-1 font-weight-bold">
                              Date Issue
                            </h6>
                            <DatePicker
                              className="form-control custom-datepicker mr-1"
                              id="dateIssue"
                              name="dateIssue"
                              selected={invoiceData.invoice.updated_at}
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
                        <h4 className="invoice-title text-primary">Invoice</h4>
                        <input
                          type="text"
                          className="form-control"
                          value={invoiceData.admin.name}
                        />
                      </div>
                      <div className="col-sm-6 col-12 order-1 order-sm-1 d-flex justify-content-end align-items-center">
                        <img
                          src={
                            invoiceData.admin.logo &&
                            `${IMAGE_URL}/${invoiceData.admin.logo}`
                          }
                          alt="logo"
                          height="auto"
                          width={164}
                        />
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
                              value={invoiceData.client.name}
                            />
                          </div>
                          <div className="col-12 col-xs-12 mb-1">
                            <textarea
                              className="form-control"
                              rows={3}
                              value={invoiceData.client.address}
                            />
                          </div>
                          <div className="col-12 col-xs-12 mb-1">
                            <input
                              type="email"
                              className="form-control"
                              value={invoiceData.client.email}
                            />
                          </div>
                          <div className="col-12 col-xs-12 mb-1">
                            <input
                              type="text"
                              className="form-control"
                              value={invoiceData.client.phone}
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
                                  {roleId !== 3 && <th>Action</th>}
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
                                    {roleId !== 3 && (
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
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {roleId !== 3 && (
                          <div className="form-group">
                            <button
                              className="btn btn-primary mt-1"
                              type="button"
                              onClick={addItem}
                            >
                              <i className="feather icon-plus-circle common-size" />{" "}
                              Add Button
                            </button>
                          </div>
                        )}
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
                              defaultValue="Partial payment"
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
                              <span className="cost-title mr-2">Subtotal </span>
                              <span className="cost-value">${subtotal.toFixed(2)}</span>
                            </li>
                            <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                              <span className="cost-title mr-2">Tax </span>
                              <span className="cost-value">{taxRate}%</span>
                            </li>
                            <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                              <span className="cost-title mr-2">Tax Amount </span>
                              <span className="cost-value">${taxAmount.toFixed(2)}</span>
                            </li>
                            <li className="dropdown-divider" />
                            <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                              <span className="cost-title mr-2">
                                Invoice Total{" "}
                              </span>
                              <span className="cost-value">${total.toFixed(2)}</span>
                            </li>
                            <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                              <span className="cost-title mr-2">
                                Amount Paid
                              </span>
                              <span className="cost-value">-${invoiceData.invoice.paid_amount.toFixed(2)}</span>
                            </li>
                            <li className="list-group-item each-cost border-0 p-50 d-flex justify-content-between">
                              <span className="cost-title mr-2">
                                Balance (USD){" "}
                              </span>
                              <span className="cost-value">${dueAmount.toFixed(2)}</span>
                            </li>
                          </ul>
                          <a
                            href="invoice-view.html"
                            className="btn btn-primary mt-1 btn-block"
                          >
                            <i className="feather icon-eye common-size" />{" "}
                            Preview
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceModal;

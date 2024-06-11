import React, { useState, useEffect } from "react";
import "./EditInvoiceModal.css";
import { getOrderDataForInvoice, saveInvoice } from "../api/collectionApis";

const AddInvoiceModal = ({ isOpen, onClose, collectionId, handleLoading }) => {
  const [invoiceData, setInvoiceData] = useState({
    admin: {
      account_name: "",
      address: "",
      phone: "",
      email: "",
      abn_acn: "",
    },
    collection: {
      id: "",
    },
  });
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [taxRate, setTaxRate] = useState(10);
  const [note, setNote] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    if (isOpen && collectionId !== null) {
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
    }
  }, [isOpen, collectionId]);

  useEffect(() => {
    calculateSubtotal();
    calculateTaxAmount();
    calculateTotal();
  }, [items, taxRate]);

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

  const handleAmountPaidChange = (e) => {
    setAmountPaid(parseFloat(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount(subtotal);
    const total = calculateTotal(subtotal, taxAmount);
    const amountDue = total - amountPaid;

    const invoice = {
      collectionId,
      clientName,
      clientAddress,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      note,
      invoiceLink,
      amountPaid,
      amountDue,
    };

    try {
      const response = await saveInvoice(invoice);
      if (response.success) {
        alert("Invoice saved successfully!");
        onClose(); // Close the modal on successful save
      } else {
        alert("Failed to save the invoice.");
      }
    } catch (error) {
      alert("An error occurred while saving the invoice.");
    }
  };

  const subtotal = calculateSubtotal();
  const taxAmount = calculateTaxAmount(subtotal);
  const total = calculateTotal(subtotal, taxAmount);
  const amountDue = total - amountPaid;

  const resetForm = () => {
    setInvoiceData({
      admin: {
        account_name: "",
        address: "",
        phone: "",
        email: "",
        abn_acn: "",
      },
      collection: {
        id: "",
      },
    });
    setError(null);
    setItems([]);
    setTaxRate(10);
    setNote("");
    setInvoiceLink("");
    setClientName("");
    setClientAddress("");
    setAmountPaid(0);
  };

  return (
    <>
      <div
        id="edit-invoice-modal"
        className={`modal ${isOpen ? "fade show" : "fade"}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {invoiceData?.collection?.id && (
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "#DEE6EE" }}
              >
                <h5 className="modal-title">Add Invoice {collectionId}</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ overflowX: "hidden" }}>
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
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Client Address"
                          value={clientAddress}
                          onChange={(e) => setClientAddress(e.target.value)}
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
                      className="form-control"
                      id="notes"
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
                      className="form-control"
                      id="invoice-link"
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
                        <label className="col-sm-4 col-form-label">
                          Total:
                        </label>
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
                            value={amountPaid}
                            onChange={handleAmountPaidChange}
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
                            value={amountDue.toFixed(2)}
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
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddInvoiceModal;
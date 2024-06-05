import React, { useState, useEffect } from "react";
import "./EditInvoiceModal.css";
import { getOrderDataForInvoice, saveInvoice } from "../api/collectionApis";
import { getInvoiceData } from "../api/invoiceApis";
import phpUnserialize from 'php-unserialize';

const EditInvoiceModal = ({ isOpen, onClose, invoiceId }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [taxRate, setTaxRate] = useState(10);
  const [note, setNote] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  useEffect(() => {
    if (isOpen && invoiceId) {
      const fetchInvoiceData = async () => {
        try {
          let dataToSend = new FormData();
          dataToSend.append("invoiceId", invoiceId);
          let response = await getInvoiceData(dataToSend);
          let invoiceItem = response.data.invoice;
          let itemDescriptions = invoiceItem.item_descriptions;
          console.log(itemDescriptions);
          const parsedDescriptions = phpUnserialize(itemDescriptions);
          console.log(parsedDescriptions);
          const itemsArray = Object.keys(parsedDescriptions).map((key, i) => {
            const item = parsedDescriptions[key];
            return {
              id: i,
              name: item.product_name,
              description: item.product_desc,
              quantity: item.product_quantity,
              price: item.product_price,
            };
          });
      
          setItems(itemsArray);

          setInvoiceData(response.data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchInvoiceData();
    }
  }, [isOpen, invoiceId]);

  console.log(items);

  console.log(invoiceData);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount(subtotal);
    const total = calculateTotal(subtotal, taxAmount);

    const invoice = {
      invoiceId,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      note,
      invoiceLink,
    };

    try {
      const response = await saveInvoice(invoice);
      if (response.success) {
        alert("Invoice saved successfully!");
        onClose();
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

  return (
    <div
      id="edit-invoice-modal"
      className={`modal ${isOpen ? "fade show" : "fade"}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#DEE6EE" }}>
            <h5 className="modal-title">Edit Invoice {invoiceId}</h5>
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
              <div className="modal-body">
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
                        <input type="number" className="form-control" />
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
                          value={total.toFixed(2)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceModal;

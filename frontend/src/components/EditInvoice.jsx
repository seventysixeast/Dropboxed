import React, { useState, useEffect } from "react";
import "./EditInvoiceModal.css";
import { getInvoiceData, updateInvoice } from "../api/invoiceApis";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
import { getOrderDataForInvoice, saveInvoice } from "../api/collectionApis";
import { getAllServices } from "../api/serviceApis";
import Select from "react-select";
import SelectItemModal from '../components/SelectItemModal';
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const EditInvoiceModal = ({
  isOpen,
  onClose,
  invoiceId,
  handleLoading,
  isEdit,
  collectionId,
  refreshInvoiceList,
}) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [taxRate, setTaxRate] = useState(11);
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
  const [paidStatus, setPaidStatus ] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [isItemSelectModalOpen, setIsItemSelectModalOpen] = useState(false); // State for item selection modal

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
          setNote(response.data.invoice.notes);
          setInvoiceLink(response.data.invoice.invoice_link)
          const newAddress = response.data.invoice.user_address;

          // setInvoiceData((prevData) => ({
          //   ...prevData,
          //   client: {
          //     ...prevData.client,
          //     address: newAddress,
          //   },
          // }));
          setClientAddress(newAddress);
          setPaidStatus(response.data.invoice.paid_status);
        } catch (err) {
          setError(err.message);
        }
        handleLoading();
      };
      fetchInvoiceData();
      getServiceList();
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
          setClientAddress(data.data.collection.client_address || "");
        } catch (err) {
          setError(err.message);
        }
        handleLoading();
      };

      fetchInvoiceData();
      getServiceList();
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
  /*const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", description: "", quantity: 1, price: 0 },
    ]);
  };*/

  const addItem = () => {
    setIsItemSelectModalOpen(true); // Open the item selection modal
  };

  const handleSelectItem = (selectedItem) => {
    // Format data required from selected item
    selectedItem.details = JSON.parse(selectedItem.image_type_details);
    selectedItem.details = selectedItem.details
      .map(
        (detail) =>
          `${detail.image_type_count} ${detail.image_type_label}`
      )
      .join(", ");
    const details = selectedItem.details;
    delete selectedItem.details;
    selectedItem.description = details;

    // Add selecetd item into items array
    setItems([
      ...items,
      { id: Date.now(), name: selectedItem.package_name, description: selectedItem.description, quantity: 1, price: selectedItem.package_price },
    ]);
    setIsItemSelectModalOpen(false); // Close the item selection modal
  };

  const getServiceList = async () => {
    //setItemsLoading(true);
    try {
      const formData = new FormData();
      formData.append("role_id", roleId);
      formData.append("subdomain_id", subdomainId);
      formData.append("user_id", user.id);
      const response = await getAllServices(formData);
      setAvailableItems(response.data);
    } catch (error) {
      console.error("Error fetching Service list:", error);
    }
    //setItemsLoading(false);
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
    return subtotal / taxRate;
  };

  const calculateTotal = (subtotal, taxAmount) => {
    return subtotal; //+ taxAmount;
  };

  const handleStatusChange = (event) => {
    console.log("status",event.target.value)
    const value = event.target.value === "Paid" ? true : false;
    setPaidStatus(value);
    if(value === true){
      setPaidAmount(total)
    }
  };

  const resetData = () => {
    setItems([]);
    setTaxRate(10);
    setNote("");
    setInvoiceLink("");
    setPaidAmount(0);
    setClientAddress("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading();
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
      clientAddress: clientAddress,
      dueAmount: total - paidAmount,
      paidAmount,
      paidStatus,
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

      if (response && response.success) {
        toast.success(
          `Invoice ${isEdit ? "updated" : "created"} successfully!`
        );
        refreshInvoiceList();
        resetData();
        onClose();
      } else {
        toast.error(`Failed to ${isEdit ? "update" : "create"} the invoice.`);
      }
    } catch (error) {
      console.log("errorrr",error)
      toast.error(
        `An error occurred while ${
          isEdit ? "updating" : "creating"
        } the invoice.`
      );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      {roleId !== 3 ? (
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#DEE6EE" }}
            >
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
              <div
                style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
              >
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
                                        ? new Date(
                                            invoiceData.invoice.updated_at
                                          )
                                        : new Date()
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    readOnly={true}
                                  />
                                </div>
                                {/*<div className="due-date d-flex align-items-center justify-content-start">
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
                                </div>*/}
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
                                    value={clientAddress}
                                    onChange={(e) =>
                                      // setInvoiceData({
                                      //   ...invoiceData,
                                      //   collection: {
                                      //     ...invoiceData.collection,
                                      //     address: e.target.value,
                                      //   },
                                      // })
                                      setClientAddress(e.target.value)
                                    }
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
                                    maxLength="10"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-xl-6 col-xs-12 col-sm-12 text-center">
                              <div className="title-text">Bill From</div>
                              <div className="row">
                              <div className="col-12 col-xs-12 mb-1">
                                {invoiceData.admin.name}
                                <br />
                                {invoiceData.admin.address}
                                <br />
                                {invoiceData.admin.phone}
                                <br />
                                {invoiceData.admin.email}
                                <br />
                                {invoiceData.admin.abn_acn}
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
                              { roleId !== 3 && (
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
                            ) }
                            </form>
                          </div>
                          <hr />
                          <div className="invoice-total">
                            <div className="row justify-content-between">
                              <div className="col-12 col-md-6 col-lg-6 col-xl-5">
                                <div className="regarding-payment form-group">
                                  <select
                                    className="select2 form-control w-50 form-control col-sm-6 col-md-3"
                                    name="fromTime"
                                    id="fromTime"
                                    value={paidStatus ? "Paid" : "Pending"}
                                    onChange={handleStatusChange}
                                    style={{ cursor: "pointer" }}
                                    required
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                  </select>
                                </div>
                                <div className="regarding-discount form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    onChange={(e) => setNote(e.target.value)}
                                    value={note}
                                    placeholder="Add notes here!"
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
                                    <span className="cost-title mr-2">
                                      Tax{" "}
                                    </span>
                                    <span className="cost-value">
                                      {taxRate}%
                                    </span>
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
                                      Invoice Total (Inc. GST){" "}
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
                                      Balance{" "}
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
          {/* Select Item Modal */}
      <SelectItemModal
        isOpen={isItemSelectModalOpen}
        onClose={() => setIsItemSelectModalOpen(false)}
        onSelectItem={handleSelectItem}
        availableItems={availableItems}
      />
        </div>
      ) : (
        // view Invoice for client
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#DEE6EE" }}
            >
              <h5 className="modal-title">View Invoice</h5>
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
              <div
                style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
              >
                {invoiceData && (
                  <form>
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
                                  <p className="" style={{ marginTop: "6px" }}>
                                    {invoiceId}
                                  </p>
                                </div>
                              )}
                              <div className="col-xl-9 col-md-12 d-flex justify-content-xl-end align-items-lg-start align-items-sm-start align-items-xs-start align-items-center flex-wrap px-0 pt-xl-0 pt-1">
                                <div className="issue-date d-flex align-items-center justify-content-start mr-2 mb-75 mb-xl-0">
                                  <h6 className="invoice-text mr-1 font-weight-bold">
                                    Date Issue
                                  </h6>
                                  <p style={{ marginTop: "6px" }}>
                                    {formatDate(invoiceData.invoice.updated_at)}
                                  </p>
                                </div>
                                {/*<div className="due-date d-flex align-items-center justify-content-start">
                                  <h6 className="invoice-text mr-1 font-weight-bold">
                                    Date Due
                                  </h6>
                                  <p style={{ marginTop: "6px" }}>
                                    {formatDate(new Date())}
                                  </p>
                                </div>*/}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row my-2">
                            <div className="col-sm-6 col-12 order-2 order-sm-1">
                              <h4 className="invoice-title text-primary">
                                Invoice
                              </h4>
                              <p>{invoiceData.admin.name}</p>
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
                                  <p className="mt-1">
                                    {invoiceData.client.name}
                                  </p>
                                </div>
                                <div className="col-12 col-xs-12">
                                  <p className="mt-1">
                                    {invoiceData.client.address}
                                  </p>
                                </div>
                                <div className="col-12 col-xs-12 ">
                                  <p className="mt-1">
                                    {invoiceData.client.email || ""}
                                  </p>
                                </div>
                                <div className="col-12 col-xs-12 ">
                                  <p className="mt-1">
                                    {invoiceData.client.phone || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-xl-6 col-xs-12 col-sm-12 text-center">
                              <div className="title-text">Bill From</div>
                              <div className="row">
                              <div className="col-12 col-xs-12 mb-1">
                                {invoiceData.admin.name}
                                <br />
                                {invoiceData.admin.address}
                                <br />
                                {invoiceData.admin.phone}
                                <br />
                                {invoiceData.admin.email}
                                <br />
                                {invoiceData.admin.abn_acn}
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {items.map((item, index) => (
                                        <tr key={item.id}>
                                          <td>
                                            <p className="mt-1">{item.name}</p>
                                          </td>
                                          <td>
                                            <p className="mt-1">
                                              {item.description}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="mt-1">
                                              {item.quantity}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="mt-1">
                                              ${item.price}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="mt-1 font-weight-bold">
                                              ${item.quantity * item.price}
                                            </p>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </form>
                          </div>
                          <hr />
                          <div className="invoice-total">
                            <div className="row justify-content-between">
                              <div className="col-12 col-md-6 col-lg-6 col-xl-5">
                              <div className="regarding-payment form-group d-flex">
                                  <label className="mr-2 font-weight-bold">
                                    Status
                                  </label>
                                  <p className="">
                                    {paidStatus
                                      ? "Paid"
                                      : "Pending"}
                                  </p>
                                </div>
                                <div className="regarding-discount form-group d-flex">
                                <label className="mr-2 font-weight-bold">
                                    Note
                                  </label>
                                  {/* <input
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    onChange={(e) => setNote(e.target.value)}
                                    value={note}
                                    placeholder="Add notes here!"
                                  /> */}
                                  <p className="">
                                    {note || ""}
                                  </p>
                                </div>
                                {invoiceLink && (
                                    <div className="regarding-discount form-group d-flex">
                                        <label className="mr-2 font-weight-bold">
                                            Quickbook Invoice Link
                                        </label>
                                        <a href={invoiceLink} target="_blank" rel="noopener noreferrer">
                                            {invoiceLink}
                                        </a>
                                    </div>
                                )}
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
                                    <span className="cost-title mr-2">
                                      Tax{" "}
                                    </span>
                                    <span className="cost-value">
                                      {taxRate}%
                                    </span>
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
                                      Balance{" "}
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
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInvoiceModal;

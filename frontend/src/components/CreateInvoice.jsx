import React from 'react';

const EditInvoice = () => {
  return (
    <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
      <div className="row">
        <div className="col">
          <h2>Edit Invoice</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Invoice</li>
            </ol>
          </nav>
          <form>
            <div className="row">
              <div className="col-md-6">
                <h4>From,</h4>
                <p>
                  Media Drive Systems<br />
                  22 Farrelly Ave<br />
                  Cumbalum NSW 2478<br />
                  0413799054<br />
                  pete@mediadrive.com.au<br />
                  ABN 72600082460
                </p>
              </div>
              <div className="col-md-6">
                <h4>To,</h4>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Client Name" />
                </div>
                <div className="form-group">
                  <textarea className="form-control" rows="3" placeholder="Client Address"></textarea>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th></th>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="text" className="form-control" value="Studio Package" /></td>
                    <td><input type="text" className="form-control" value="0 High resolution images, 0 Aerial photos, 0 Studio Floor plan" /></td>
                    <td><input type="number" className="form-control" value="1" /></td>
                    <td><input type="number" className="form-control" value="385.00" /></td>
                    <td><input type="number" className="form-control" value="385.00" readOnly /></td>
                  </tr>
                  <tr>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="text" className="form-control" /></td>
                    <td><input type="text" className="form-control" /></td>
                    <td><input type="number" className="form-control" /></td>
                    <td><input type="number" className="form-control" /></td>
                    <td><input type="number" className="form-control" readOnly /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-danger">- Delete</button>
            <button type="button" className="btn btn-success">+ Add More</button>

            <div className="form-group mt-3">
              <label htmlFor="notes">Notes:</label>
              <textarea className="form-control" id="notes" rows="3" placeholder="Your Notes"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="invoice-link">Invoice Link:</label>
              <input type="text" className="form-control" id="invoice-link" />
            </div>

            <div className="row mt-4">
              <div className="col-md-8">
                <button type="button" className="btn btn-primary">Update Invoice</button>
              </div>
              <div className="col-md-4">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Subtotal:</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" value="350.00" readOnly />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Tax Rate:</label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input type="number" className="form-control" value="10" />
                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Tax Amount:</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" value="35.00" readOnly />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Total:</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" value="385.00" readOnly />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Amount Paid:</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Amount Due:</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" value="385.00" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditInvoice;

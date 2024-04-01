import React, { useState } from "react";

const Clients = () => {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", email: "johndoe123@gmail.com", phone: "2222234321" },
    { id: 2, name: "Jane Smith", email: "janesmith456@gmail.com", phone: "2343444545" }
  ]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [editClientModel, setEditClientModel] = useState(false);
  const [clientId, setClientId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClientModel) {
      const updatedClients = clients.map((client) =>
        client.id === clientId ? { ...client, ...formData } : client
      );
      setClients(updatedClients);
      setEditClientModel(false);
      setClientId(null);
    } else {
      const newClient = { id: clients.length + 1, ...formData };
      setClients([...clients, newClient]);
    }
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleDeleteClient = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
  };

  const handleEditClient = (client) => {
    setFormData(client);
    setEditClientModel(true);
    setClientId(client.id);
  };

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Clients</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Clients</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
            <ul className="list-inline mb-0">
              <li>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-block"
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    Add Client
                  </button>

                  <div
                    className="modal fade text-left"
                    id="bootstrap"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel35"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3 className="card-title">Add Client</h3>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <input
                              type="reset"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                              value="Close"
                            />
                            <input
                              type="submit"
                              className="btn btn-primary btn"
                              value={editClientModel ? "Update" : "Add"}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table class="table table-striped table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Collections</th>
                        <th>Action</th>

                        <th className="d-none"></th>
                        <th className="d-none"></th>
                        <th className="d-none"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{client.name}</td>
                          <td>{client.email}</td>
                          <td>{client.phone}</td>
                          <td>{client.collection}</td>
                          <td>
                            <button
                              class="btn btn-sm btn-outline-secondary mr-1 mb-1"
                              title="Edit"
                              data-toggle="modal"
                              data-target="#bootstrap"
                              onClick={() => handleEditClient(client)}
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-outline-danger mr-1 mb-1"
                              title="Delete"
                              onClick={() => handleDeleteClient(client.id)}>
                              <i className="fa fa-remove"></i>
                            </button>
                          </td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
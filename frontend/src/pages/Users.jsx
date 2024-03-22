import React from "react";

const Users = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="users-list-filter px-1">
          <form action="#" method="get">
            <div className="row border border-light rounded py-2 mb-2">
              <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-role">Role</label>
                <fieldset className="form-group">
                  <select className="form-control" id="users-list-role" name="role_id">
                    <option value="">Any</option>
                    <option value="1">Administrator</option>
                    <option value="2">Photographer</option>
                    <option value="3">Client</option>
                    <option value="4">Editor</option>
                    <option value="5">Business</option>
                  </select>
                </fieldset>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-status">Status</label>
                <fieldset className="form-group">
                  <select className="form-control" id="users-list-status" name="status">
                    <option value="">Any</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </fieldset>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                <button type="submit" className="btn btn-info btn-block btn-primary white glow">Show</button>
              </div>
            </div>
          </form>
        </div>
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="users-list-datatable" className="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>username/email</th>
                        <th>name</th>
                        <th>role</th>
                        <th>ColorCode</th>
                        <th>status</th>
                        <th>Action</th>
                        <th>Assign Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>69</td>
                        <td>
                          Manpreet <br />
                          <b>manpreet02701@gmail.com</b>
                        </td>
                        <td>Manpreet Singh</td>
                        <td>Administrator</td>
                        <td><input type="color" id="colorcode" name="colorcode" value="#000000" /></td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td>
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-edit-1" />
                          </a>
                          |
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-delete" />
                          </a>
                        </td>
                        <td style={{ width: '100%' }}>
                          <form method="post" action="https://client.mediadrive.com.au/functions/assign_clients.php">
                            <div className="col-md-12 assignclients">
                              <select className="form-control client_ids select2-hidden-accessible" name="client_ids[]" multiple tabIndex="-1" aria-hidden="true">
                                <option value="">--Select Client--</option>
                              </select>
                              <span className="select2 select2-container select2-container--default select2-container--above" dir="ltr" style={{ width: '306.297px' }}>
                                <span className="selection">
                                  <span className="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="-1">
                                    <ul className="select2-selection__rendered">
                                      <span className="select2-selection__clear">×</span>
                                      <li className="select2-search select2-search--inline">
                                        <input className="select2-search__field" type="search" tabIndex="0" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" role="textbox" aria-autocomplete="list" placeholder="Select Clients" style={{ width: '190.281px' }} />
                                      </li>
                                    </ul>
                                  </span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true"></span>
                              </span>
                              <input type="submit" name="assign_clients" value="Add Clients" className="btn btn-info btn-primary" style={{ width: '30%', marginLeft: '5px' }} />
                            </div>
                            <input type="hidden" name="user_id" value="48" />
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td>68</td>
                        <td>
                          ShannonAllan <br />
                          <b>shannon.allan@raywhite.com</b>
                        </td>
                        <td>Shannon</td>
                        <td>Client</td>
                        <td><input type="color" id="colorcode" name="colorcode" value="#fffb00" /></td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td>
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-edit-1" />
                          </a>
                          |
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-delete" />
                          </a>
                        </td>
                        <td style={{ width: '100%' }}>
                          <form method="post" action="https://client.mediadrive.com.au/functions/assign_clients.php">
                            <div className="col-md-12 assignclients">
                              <select className="form-control client_ids select2-hidden-accessible" name="client_ids[]" multiple="" tabIndex="-1" aria-hidden="true">
                                <option value="">--Select Client--</option>
                                <option value="141">Shannon</option>
                                <option value="140">Mcgrath Real Estate</option>
                              </select>
                              <span className="select2 select2-container select2-container--default select2-container--focus select2-container--above" dir="ltr" style={{ width: '306.297px' }}>
                                <span className="selection">
                                  <span className="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="-1">
                                    <ul className="select2-selection__rendered">
                                      <li className="select2-search select2-search--inline">
                                        <input className="select2-search__field" type="search" tabIndex="0" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" role="textbox" aria-autocomplete="list" placeholder="Select Clients" style={{ width: '190.281px' }} />
                                      </li>
                                    </ul>
                                  </span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true"></span>
                              </span>
                              <input type="submit" name="assign_clients" value="Add Clients" className="btn btn-info btn-primary" style={{ width: '30%', marginLeft: '5px' }} />
                            </div>
                            <input type="hidden" name="user_id" value="110" />
                          </form>
                        </td>
                      </tr>
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

export default Users;
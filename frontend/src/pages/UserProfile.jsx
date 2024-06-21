import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getPhotographerAdmin } from "../api/photographerAdminApis";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../components/Loader";
import moment from "moment";

const UserProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({});
  const [totalClients, setTotalClients] = useState(0);
  const [totalPhotographers, setTotalPhotographers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalGalleries, setTotalGalleries] = useState(0);
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

  useEffect(() => {
    if (id !== undefined) {
      getPhotographerAdminData();
    }
  }, [id]);

  const getPhotographerAdminData = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      const res = await getPhotographerAdmin(formDataToSend);
      const data = res.data;
      setPreviewImage(data.profile_photo ? `${IMAGE_URL}/${data.profile_photo}` : null);
      setData(data);
      setTotalClients(res.totalClients);
      setTotalPhotographers(res.totalPhotographers);
      setTotalBookings(res.totalBookings);
      setTotalGalleries(res.totalGalleries);
    } catch (error) {
      console.error("Failed to get photographer admin data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="content-header-left col-md-6 col-6 mb-2 mt-2">
            <h3 className="content-header-title mb-0">User Profile</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">User Profile</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section className="users-view">
              <div className="row">
                <div className="col-12 col-sm-7">
                  <div className="media mb-2">
                    <img
                      src={
                        previewImage
                          ? `${previewImage}`
                          : "../../../app-assets/images/portrait/medium/dummy.png"
                      }
                      alt="users view avatar"
                      className="users-avatar-shadow rounded-circle mr-1"
                      height="64"
                      width="64"
                    />
                    <div className="media-body pt-25">
                      <h4 className="media-heading">
                        <span className="users-view-name">{data.name}</span>
                      </h4>
                      <span className="users-view-id">{data.subdomain}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Registered:</td>
                              <td>{moment(data.created).format("DD/MM/YYYY")}</td>
                            </tr>
                            <tr>
                              <td>Latest Activity:</td>
                              <td>{moment(data.modified).format("DD/MM/YYYY")}</td>
                            </tr>
                            <tr>
                              <td>Verified:</td>
                              <td>Yes</td>
                            </tr>
                            <tr>
                              <td>Status:</td>
                              <td><span className="badge badge-success users-view-status">{data.status}</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-4">
                        <h5 class="mb-1"><i class="feather icon-info"></i> Personal Info</h5>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Name:</td>
                              <td>{data.name}</td>
                            </tr>
                            <tr>
                              <td>E-mail:</td>
                              <td><a href={"mailto:" + data.email}>{data.email}</a></td>
                            </tr>
                            <tr>
                              <td>Studio name:</td>
                              <td>{data.subdomain}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-4">
                        <h5 class="mb-1"><i class="feather icon-info"></i> Banking Details</h5>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>Account name:</td>
                              <td>{data.account_name}</td>
                            </tr>
                            <tr>
                              <td>Account Number:</td>
                              <td>{data.account_number}</td>
                            </tr>
                            <tr>
                              <td>ABN/ACN Number:</td>
                              <td>{data.abn_acn}</td>
                            </tr>
                            <tr>
                              <td>BSB Number:</td>
                              <td>{data.bsb_number}</td>
                            </tr>
                            <tr>
                              <td>Account Email:</td>
                              <td>{data.account_email}</td>
                            </tr>
                            <tr>
                              <td>Country:</td>
                              <td>{data.country}</td>
                            </tr>
                            <tr>
                              <td>Address:</td>
                              <td>{data.address}</td>
                            </tr>
                            <tr>
                              <td>City:</td>
                              <td>{data.city}</td>
                            </tr>
                            <tr>
                              <td>Postal Code:</td>
                              <td>{data.postal_code}</td>
                            </tr>
                            <tr>
                              <td>Phone:</td>
                              <td>{data.phone}</td>
                            </tr>
                            <tr>
                              <td>Website:</td>
                              <td>{data.website}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="row bg-primary bg-lighten-5 rounded mb-2 mx-25 text-center text-lg-left">
                      <div className="col-12 col-sm-3 p-2">
                        <h6 className="text-primary mb-0">Clients: <span className="font-large-1 align-middle">{totalClients ? totalClients : 0}</span></h6>
                      </div>
                      <div className="col-12 col-sm-3 p-2">
                        <h6 className="text-primary mb-0">Photographer Teams: <span className="font-large-1 align-middle">{totalPhotographers ? totalPhotographers : 0}</span></h6>
                      </div>
                      <div className="col-12 col-sm-3 p-2">
                        <h6 className="text-primary mb-0">Bookings: <span className="font-large-1 align-middle">{totalBookings ? totalBookings : 0}</span></h6>
                      </div>
                      <div className="col-12 col-sm-3 p-2">
                        <h6 className="text-primary mb-0">Galleries: <span className="font-large-1 align-middle">{totalGalleries ? totalGalleries : 0}</span></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

import React, { useEffect, useMemo, useState } from "react";
import { getAllOrders } from "../api/ordersApis";
import { useAuth } from "../context/authContext";
import TableCustom from "../components/Table";
import ReTooltip from "../components/Tooltip";
import { Switch } from "@mui/material";
import moment from "moment";
const IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

const Order = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const userId = user.id;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const fetchAllOrders = async () => {
    setLoading(true);
    setItemsLoading(true);
    try {
      let form = new FormData();
      form.append("subdomain_id", subdomainId);
      const res = await getAllOrders(form);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setItemsLoading(false);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const theColumns = React.useMemo(
    () => [
      { Header: "Order No.", accessor: "id" },
      {
        Header: "Banner Image",
        Cell: ({ row }) => {
          const bannerSrc = `${IMAGE_URL}/${row?.original?.Collection?.banner}`;
          return (
            <img
              src={bannerSrc}
              className="width-100"
              alt="Banner"
              onClick={() => console.log(bannerSrc)}
            />
          );
        },
      },
      { Header: "Address", accessor: "client_address" },
      {
        Header: "Client",
        accessor: "client_name",
        className: roleId === 3 ? "d-none" : "",
      },
      { Header: "Photographers", accessor: "photographers_name" },
      {
        Header: "Unlock/Lock",
        Cell: ({ row }) => (
          <ReTooltip title="Click to change lock status." placement="top">
            <Switch
              id="lockGallery"
              checked={!!row.original?.Collection?.lock_gallery}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ReTooltip>
        ),
      },
      {
        Header: "Image Counts",
        Cell: ({ row }) => (
          <div className="btnsrow text-center">
            <ReTooltip title="Click to update image count." placement="top">
              <div
                className="badge badge-pill badge-light-primary"
                style={{ cursor: "pointer" }}
              >
                {row.original?.Collection?.image_count || 0} images
              </div>
            </ReTooltip>
          </div>
        ),
      },
      {
        Header: "Created On",
        Cell: ({ row }) => {
          const createdDate = row.original?.Collection?.created
            ? moment(row.original.Collection.created)
            : null;
          return (
            <div className="btnsrow text-center">
              <div className="badge badge-pill badge-light-primary">
                {createdDate ? createdDate.format("DD/MM/YYYY") : "N/A"}
              </div>
              <div>{createdDate ? createdDate.format("HH:mm A") : "N/A"}</div>
            </div>
          );
        },
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <ReTooltip title="Click to delete the collection." placement="top">
              <button
                className="btn btn-icon btn-outline-danger mr-1 mb-1"
                onClick={() => {
                  setShowDeleteModal(true);
                  setOrderId(row.original?.Collection?.id);
                }}
              >
                <i className="feather white icon-trash"></i>
              </button>
            </ReTooltip>
          </div>
        ),
      },
    ],
    [roleId]
  );

  let columns;

  if (roleId === 3) {
    columns = theColumns.filter((column) => column.Header !== "Client");
  } else {
    columns = theColumns;
  }
  const data = useMemo(() => orders, [orders]);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Orders List</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item">Orders</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TableCustom data={data} columns={columns} loading={loading} />
    </>
  );
};

export default Order;

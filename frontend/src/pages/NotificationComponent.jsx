import React, { useEffect, useState } from "react";
import TableCustom from "../components/Table";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../context/authContext";
import { getAllNotifications, deleteNotification } from "../api/notificationApis";
import { format } from 'date-fns';

const NotificationComponent = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const clientId = user.id;
  const [notifications, setNotifications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);

  useEffect(() => {
    getAllNotificationsData();
  }, []);

  const getAllNotificationsData = async () => {
    try {
      const formData = new FormData();
      formData.append("subdomain_id", subdomainId);
      formData.append("client_id", clientId);
      let allNotificationsData = await getAllNotifications(formData);
      if (allNotificationsData && allNotificationsData.success) {
        setNotifications(allNotificationsData.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const deleteNotificationData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", notificationIdToDelete);
      let res = await deleteNotification(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllNotificationsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => format(new Date(value), 'dd-MM-yyyy')
      },
      { Header: "Notification", accessor: "notification" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <button
              className="btn btn-icon btn-outline-danger mr-1 mb-1"
              title="Delete"
              onClick={() => {
                setShowDeleteModal(true);
                setNotificationIdToDelete(row.original.id);
              }}
            >
              <i className="feather white icon-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => notifications, [notifications]);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Notifications</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Notifications</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TableCustom data={data} columns={columns} />
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteNotificationData}
        message="Are you sure you want to delete this notification?"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};

export default NotificationComponent;

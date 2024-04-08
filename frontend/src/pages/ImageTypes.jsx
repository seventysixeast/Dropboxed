import React, { useEffect, useState } from "react";
import {
  getAllImageTypes,
  createImageType,
  getImageType,
  deleteImageType,
} from "../api/imageTypeApis";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";

const ImageTypes = () => {
  const [imagesTypes, setImageTypes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    price: "",
    status: "Active",
    gallery_status: "Image",
  });

  useEffect(() => {
    getAllImageTypesData();
  }, []);

  const getAllImageTypesData = async () => {
    try {
      let allImageTypesData = await getAllImageTypes();
      setImageTypes(allImageTypesData.data);
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let imageType = { ...formData };
    if (name === "type") {
      imageType.type = value;
    } else if (name === "price") {
      imageType.price = value;
    } else if (name === "status") {
      imageType.status = value;
    } else if (name === "gallery_status") {
      imageType.gallery_status = value;
    }
    setFormData(imageType);
  };

  const resetFormData = async () => {
    setFormData({
      id: "",
      type: "",
      price: "",
      status: "",
      gallery_status: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("gallery_status", formData.gallery_status);

      let res = await createImageType(formDataToSend);
      toast.success(res.message);
      resetFormData();
      document.getElementById("closeModal").click();
      getAllImageTypesData();
    } catch (error) {
      toast.error(error);
    }
  };

  const getImageTypeData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      let imageTypeData = await getImageType(formDataToSend);
      setFormData(imageTypeData.data);
    } catch (error) {
      console.error("Failed to get ImageTypes:", error.message);
    }
  };

  const deleteImageTypeData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      let res = await deleteImageType(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllImageTypesData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "S.No.", accessor: "id" },
      { Header: "Type", accessor: "type" },
      { Header: "Price", accessor: "price" },
      { Header: "Status", accessor: "status" },
      { Header: "Gallery Status", accessor: "gallery_status" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <button
              className="btn btn-sm btn-outline-secondary mr-1 mb-1"
              title="Edit"
              onClick={() => getImageTypeData(row.original.id)}
              data-toggle="modal"
              data-target="#bootstrap"
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger mr-1 mb-1"
              title="Delete"
              onClick={() => {
                setShowDeleteModal(true);
                setImageTypeIdToDelete(row.original.id);
              }}
            >
              <i className="fa fa-remove"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );
  

  const data = React.useMemo(() => imagesTypes, [imagesTypes]);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-6">
              <h3 className="content-header-title mb-0">Image Types</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Image Types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteImageTypeData}
        message="Are you sure you want to delete this imageType?"
      />
            <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
      <TableCustom data={data} columns={columns} />

    </>
  );
};

export default ImageTypes;

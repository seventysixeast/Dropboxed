import React, { useState, useEffect } from "react";
import {
  deleteService,
  getAllServices,
  updateServiceOrder,
} from "../api/serviceApis";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";

const CardsPackages = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const accesstoken = authData.token;
  const [servicesData, setServicesData] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usedServices, setUsedServices] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    setItemsLoading(true);
    const formData = new FormData();
    if (subdomainId !== "") {
      formData.append("subdomain_id", subdomainId);
    } else {
      formData.append("subdomain_id", user.id);
    }
    formData.append("role_id", roleId);
    const response = await getAllServices(formData);
    if (response.success) {
      let servicesWithParsedImages = response.data.map((service) => ({
        ...service,
        image_type_details: JSON.parse(service.image_type_details),
      }));

      servicesWithParsedImages.sort(
        (a, b) => b.package_order - a.package_order
      );

      setServicesData(servicesWithParsedImages);
      const uniquePackageIds = response.uniquePackageIds.map(Number);
      setUsedServices(uniquePackageIds);
    } else {
      toast.error("Failed to get services!");
    }
    setItemsLoading(false);
  };

  const handleEditService = (service) => {
    navigate(`/services/edit-service/${service.id}`);
  };

  const handleDeleteService = (service) => {
    setServiceId(service.id);
    if (usedServices.includes(service.id)) {
      toast.error("Service is being used in a collection/booking.");
      const timeoutId = setTimeout(() => {
        setShowDeleteModal(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setShowDeleteModal(true);
    }
  };

  const deleteServiceId = async () => {
    const formData = new FormData();
    formData.append("id", serviceId);
    const response = await deleteService(formData);
    if (response.success) {
      toast.success("Service deleted successfully!");
      getServices();
    } else {
      toast.error("Failed to delete service!");
    }
    setShowDeleteModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setServiceId(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = ({ active, over }) => {
    if (active.id === over.id) {
      return;
    }

    const oldIndex = servicesData.findIndex((item) => item.id === active.id);
    const newIndex = servicesData.findIndex((item) => item.id === over.id);
    const updatedItems = arrayMove(servicesData, oldIndex, newIndex);
    setServicesData(updatedItems);
    handleServiceOrder(updatedItems);
  };

  const handleServiceOrder = async (updatedItems) => {
    setLoading(true);
    try {
      const itemIds = updatedItems.map((item) => item.id);
      let newitems = updatedItems.map((item) => item.id);
      const sorted = newitems.sort((a, b) => b - a);
      const response = await updateServiceOrder({
        ids: itemIds,
        orders: sorted,
      });

      if (response.success) {
        toast.success("Service order updated successfully!");
      } else {
        toast.error("Failed to update service order!");
      }
    } catch (error) {
      toast.error("Failed to update service order!");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-7 mb-2">
              <h3 className="content-header-title mb-0">Services & Prices</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Services & Prices</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-5 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group">
                    {roleId !== 3 && (
                      <Link
                        type="button"
                        className="btn btn-outline-primary btn-block"
                        to="/services/add-service"
                      >
                        Add Service
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <SortableContext
              items={servicesData}
              strategy={rectSortingStrategy}
            >
              <div className="row">
                {servicesData.length > 0 ? (
                  servicesData.map((service) => (
                    <SortableItem
                      key={service.id}
                      id={service.id}
                      package_order={service.package_order}
                      service={service}
                      roleId={roleId}
                      handleEditService={handleEditService}
                      handleDeleteService={handleDeleteService}
                    />
                  ))
                ) : (
                  <>
                    <div className="col-12 d-flex justify-content-center overflow-hidden">
                      {itemsLoading ? (
                        <div className="spinner-border primary" role="status">
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <div className="col-12 text-center">
                          <p>No services found.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={deleteServiceId}
        message="Are you sure you want to delete this service?"
      />
    </>
  );
};

export default CardsPackages;

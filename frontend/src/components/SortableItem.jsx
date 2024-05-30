import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({
  id,
  service,
  roleId,
  handleEditService,
  handleDeleteService,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({ id });

  const style =
    roleId !== 3
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: isDragging ? 9999 : "auto",
          opacity: isDragging ? 0.5 : 1,
          borderLeft: over && over.id === id ? "4px solid #007bff" : "none",
        }
      : {};

  const commonProps =
    roleId !== 3
      ? {
          ref: setNodeRef,
          ...attributes,
          ...listeners,
        }
      : {};

  return (
    <div
      className={`col-xl-3 col-md-6 col-sm-12 ${
        service.status === "Inactive" ? "dull-card" : ""
      }`}
      style={style}
      {...commonProps}
    >
      <div className="card d-flex flex-column">
        <div className="card-content flex-grow-1">
          <div className="card-body text-center package-card">
            <h1 className="card-title" style={{ fontSize: "1.5rem" }}>
              {service.package_name}
            </h1>
            {roleId === 3 ? (
              <>
                {" "}
                {service.show_price && (
                  <h1 className="card-title">
                    ${service.package_price.toFixed(2)}
                  </h1>
                )}
              </>
            ) : (
              <h1 className="card-title">
                ${service.package_price.toFixed(2)}
              </h1>
            )}

            <ul className="list-unstyled">
              {service.image_type_details.map((imageType) => (
                <li key={imageType.image_type}>
                  {imageType.image_type_count} {imageType.image_type_label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {roleId !== 3 && (
          <div className="card-footer d-flex justify-content-between">
            <>
              <button
                className="btn btn-primary"
                onClick={() => handleEditService(service)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleDeleteService(service)}
              >
                Delete
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortableItem;

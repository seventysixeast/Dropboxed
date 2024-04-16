import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, ...rest }) => {
  return (
    <Select
      className="select2 w-100"
      options={options}
      {...rest}
      components={{
        Option: ({ data, innerRef, innerProps }) => (
          <div
            ref={innerRef}
            {...innerProps}
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <img
              src={data.image}
              className="mr-1 ml-1"
              width={"14px"}
              height={"14px"}
              alt=""
            />
            <span>{data.label}</span>
          </div>
        ),
      }}
    />
  );
};

export default CustomSelect;

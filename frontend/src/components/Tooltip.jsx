import React from "react";
import Tooltip from "@mui/material/Tooltip";

const ReTooltip = ({ title, children, placement }) => {
    return (
        <Tooltip title={title} placement={placement} arrow>
            {children}
        </Tooltip>
    );
};

export default ReTooltip;

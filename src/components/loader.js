import CircularProgress from "@material-ui/core/CircularProgress";
import ReactDOM from "react-dom";
import React from "react";
const loader = () => {
  return ReactDOM.createPortal(
    <CircularProgress />,
    document.getElementById("loader")
  );
};
export default loader;

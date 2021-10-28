import React from "react";
import "./LoadSpinner.css";

const LoadSpinner = () => {
  return (
    <div className="container-loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadSpinner;

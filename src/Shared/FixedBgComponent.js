"use client";
import React from "react";

const FixedBgComponent = ({ component }) => {
  return (
    <div
      style={{
        backgroundImage: "url('/chocolate.jpg')",
        backgroundPosition: "50% 50%",
        backgroundSize: "150%",
      }}
      className="bg-fixed bg-center bg-no-repeat bg-cover"
    >
      <div className="bg-base-100 bg-opacity-60 py-40">{component}</div>
    </div>
  );
};

export default FixedBgComponent;

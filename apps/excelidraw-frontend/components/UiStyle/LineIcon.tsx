import React from "react";

const LineIcon = ({ width = 24, height = 24, color = "#ffffff" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 13H2v-2h21v2z" />
  </svg>
);

export default LineIcon;

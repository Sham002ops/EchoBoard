import React from 'react';

const ColorDroperIcon = ({ width = '32', height = '32', color = '#ffffff' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M27,5c-1.3-1.3-3.4-1.3-4.7,0
      C18.1,9.2,9.6,17.7,8.6,18.7c-4,4-0.5,3.2-4.6,7.3l2,2c4-4,3.2-0.5,7.3-4.6c1-1,9.5-9.5,13.7-13.7C28.3,8.4,28.3,6.3,27,5L27,5z"
    />
    <line
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="17.1"
      y1="6.8"
      x2="25.2"
      y2="14.9"
    />
  </svg>
);

export default ColorDroperIcon;

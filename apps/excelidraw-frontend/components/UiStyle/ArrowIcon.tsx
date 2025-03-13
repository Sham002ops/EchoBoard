const ArrowIcon = ({ width = 24, height = 24, fill = "#ffffff" }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <rect id="view-box" width="24" height="24" fill="none"></rect>
          <path
            id="Shape"
            d="M10.22,9.28a.75.75,0,0,1,0-1.06l2.72-2.72H.75A.75.75,0,0,1,.75,4H12.938L10.22,1.281A.75.75,0,1,1,11.281.22l4,4a.749.749,0,0,1,0,1.06l-4,4a.75.75,0,0,1-1.061,0Z"
            transform="translate(4.25 7.25)"
            fill={fill}
          ></path>
        </g>
      </svg>
    );
  };
  
  export default ArrowIcon;
  
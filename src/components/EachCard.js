import React from "react";
import "./CardDesign.css";

const EachCard = ({ data }) => {
  const textStyle = {
    textDecoration: "none",
    color: "black",
    borderBottom: "none",
  };
  return (
    <div>
      <img
        src={data.imageUrls[0]}
        alt={`first image`}
        width="350"
        height="200"
      />
      <p style={textStyle}>
        rent: {data.rent} | room:{data.room} | washroom: {data.washroom}{" "}
      </p>
    </div>
  );
};

export default EachCard;

import React from "react";
import "./card.css";

const Card = ({ image, title, description }) => {
  return (
    <div className="card-container">
      <img className="card-image" src={image} />
      <div className="card-content">
        <a>{title}</a>
        <a>{description}</a>
      </div>
    </div>
  );
};

export default Card;

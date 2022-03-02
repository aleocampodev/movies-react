import React from "react";
import "./card.css";
import "../../queries.css";
import ButtonFavorites from "../ButtonFavorites/ButtonFavorites";
import { Link } from "react-router-dom";

const Card = ({ image, title, description, id }) => {
  return (
    <div className="card-container">
      <Link to={`/${id}`} className="link">
        <img className="card-image" src={image} />
      </Link>
      <div className="card-content">
        <div className="card-paragraph">
          <p>{title}</p>
          <p>{description}</p>
        </div>
        <div className="card-icon">
          <ButtonFavorites
            id={id}
            image={image}
            title={title}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

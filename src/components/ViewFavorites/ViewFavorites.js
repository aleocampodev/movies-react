import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import StarRating from "../StarRating/StarRating";
import "./view-favorites.css";

const localListFavorites = localStorage.getItem("favorites");

const ViewFavorites = () => {
  const [listFavoritesStar, setListFavoritesStar] = useState(
    JSON.parse(localListFavorites)
  );

  console.log("hola vista favoritos", listFavoritesStar);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("favorites"));
    if (items) {
      setListFavoritesStar(items);
    }
  }, []);

  const onChange = (rating, elementId) => {
    setListFavoritesStar(
      listFavoritesStar.map((item) => {
        if (item.id === elementId) {
          return { ...item, rating };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    if (id) {
      const remove = listFavoritesStar.filter((element) => element.id !== id);
      setListFavoritesStar(remove);
    }
    if (listFavoritesStar.length === 1 && localListFavorites) {
      console.log("hola bug");
      localStorage.removeItem("favorites");
    }
  };

  useEffect(() => {
    if (listFavoritesStar !== null && listFavoritesStar.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(listFavoritesStar));
    }
  }, [listFavoritesStar]);

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <h2 className="listFavoritesTitle"> Favorites List</h2>
      <div className="linkHeader">
        <button
          onClick={handleReturn}
          className="linkButton linkViewFavorites buttonViewFavorites"
        >
          <svg width="19px" height="14px" viewBox="0 0 24 24" className="icon">
            <path d="M11.4939 20.5644C11.1821 20.8372 10.7083 20.8056 10.4356 20.4939L3.43557 12.4939C3.18814 12.2111 3.18814 11.7889 3.43557 11.5061L10.4356 3.50613C10.7083 3.1944 11.1822 3.16281 11.4939 3.43557C11.8056 3.70834 11.8372 4.18216 11.5644 4.49388L5.65283 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.65283 12.75L11.5644 19.5061C11.8372 19.8179 11.8056 20.2917 11.4939 20.5644Z" />
          </svg>
          <span>Go Back</span>
        </button>
      </div>
      {!listFavoritesStar && (
        <p className="textNotViewFavorites">You don't have favorite movies</p>
      )}
      <div className="listFavorites">
        {listFavoritesStar &&
          listFavoritesStar.map((element) => {
            return (
              <div key={element.id} className="listFavoritesCard">
                <img
                  src={element.image}
                  alt={element.title}
                  className="listFavoritesImage"
                />
                <div className="listFavoritesContent">
                  <h4>{element.title}</h4>
                  <p>{element.description}</p>
                  <StarRating
                    onChange={onChange}
                    rating={element.rating || 0}
                    elementId={element.id}
                  />
                </div>
                <AiOutlineClose
                  onClick={() => removeItem(element.id)}
                  className="close"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewFavorites;

import React, { useState, useEffect } from "react";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import "./button-favorites.css";

const ButtonFavorites = ({ image, title, description, id }) => {
  const [listFavorites, setListFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const favs = JSON.parse(localFavorites);
      setListFavorites(favs);
      const findMovie = favs.find((element) => element.id === id);

      if (findMovie) {
        setIsFavorite(true);
      }
    }
  }, []);

  const newFavoriteMovie = {
    id: id,
    image: image,
    title: title,
    description: description,
  };

  const addFavoritesMovies = () => {
    const getList = localStorage.getItem("favorites");
    const getMovie = JSON.parse(getList);

    if (getMovie !== null) {
      const findMovie = listFavorites.find(
        (element) => element.id === newFavoriteMovie.id
      );

      if (findMovie) {
        const removeItem = listFavorites.filter(
          (element) => element.id !== newFavoriteMovie.id
        );
        if (listFavorites.length === 1 && getMovie) {
          localStorage.removeItem("favorites");
        }
        setListFavorites(removeItem);

        setIsFavorite(false);
      } else {
        setListFavorites([...getMovie, newFavoriteMovie]);

        setIsFavorite(true);
      }
    } else {
      setListFavorites([...listFavorites, newFavoriteMovie]);

      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (listFavorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(listFavorites));
    }
  }, [listFavorites]);

  return (
    <>
      {isFavorite ? (
        <IoIosHeart
          onClick={addFavoritesMovies}
          style={{
            color: "rgba(255, 165, 0)",
            width: "100%",
            height: "60%",
            cursor: "pointer",
          }}
        />
      ) : (
        <IoIosHeartEmpty
          onClick={addFavoritesMovies}
          style={{
            color: "rgba(255, 165, 0)",
            width: "100%",
            height: "60%",
            cursor: "pointer",
          }}
        />
      )}
    </>
  );
};

export default ButtonFavorites;

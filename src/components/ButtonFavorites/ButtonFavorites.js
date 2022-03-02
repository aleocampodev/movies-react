import React, { useState, useEffect } from "react";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const ButtonFavorites = ({ image, title, description, id }) => {
  const [listFavorites, setListFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  /*useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(addFavorites));
  }, [addFavorites]);*/

  //console.log(favoriteMovie, "hola favorites");

  const newFavoriteMovie = {
    id: id,
    image: image,
    title: title,
    description: description,
  };

  const addFavoritesMovies = () => {
    console.log(typeof listFavorites, "list favoritos");
    const getMovie = JSON.parse(localStorage.getItem("favorites"));

    if (listFavorites !== null) {
      const findMovie = listFavorites.find(
        (element) => element.id === newFavoriteMovie.id
      );
      console.log(
        listFavorites,
        findMovie,
        getMovie,
        "hola moviess",
        newFavoriteMovie.id
      );

      if (findMovie) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(
            listFavorites.filter(
              (element) => element.id !== newFavoriteMovie.id
            )
          )
        );
        setIsFavorite(false);
      } else {
        setListFavorites([...getMovie, newFavoriteMovie]);
        localStorage.setItem("favorites", JSON.stringify(listFavorites));
        setIsFavorite(true);
      }
    } else {
      setListFavorites([...listFavorites, newFavoriteMovie]);
      localStorage.setItem("favorites", JSON.stringify(listFavorites));
      setIsFavorite(true);
      console.log(listFavorites, "hola lista");
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(listFavorites));
  }, [listFavorites]);

  useEffect(() => {
    const getMovie = JSON.parse(localStorage.getItem("favorites"));
    if (getMovie !== null) {
      setListFavorites(getMovie);
    }
  }, []);

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

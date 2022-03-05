import React, { useState, useEffect } from "react";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const ButtonFavorites = ({ image, title, description, id }) => {
  const [listFavorites, setListFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const favs = JSON.parse(localFavorites);
      console.log(favs, "hola favs");
      setListFavorites(favs);
      const findMovie = favs.find((element) => element.id === id);

      if (findMovie) {
        setIsFavorite(true);
      }
    }
  }, []);

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
    const getList = localStorage.getItem("favorites");
    const getMovie = JSON.parse(getList);

    if (getMovie !== null) {
      const findMovie = listFavorites.find(
        (element) => element.id === newFavoriteMovie.id
      );
      console.log(
        listFavorites,
        findMovie,

        "hola moviess",
        newFavoriteMovie.id
      );

      if (findMovie) {
        const removeItem = listFavorites.filter(
          (element) => element.id !== newFavoriteMovie.id
        );

        setListFavorites(removeItem);
        console.log("se encuentra item");
        setIsFavorite(false);
      } else {
        setListFavorites([...getMovie, newFavoriteMovie]);
        //localStorage.setItem("favorites", JSON.stringify(listFavorites));

        console.log("localstorage st 1");
        setIsFavorite(true);
      }
    } else {
      setListFavorites([...listFavorites, newFavoriteMovie]);
      //localStorage.setItem("favorites", JSON.stringify(listFavorites));
      setIsFavorite(true);
      console.log(listFavorites, "hola lista");
    }
  };

  useEffect(() => {
    if (listFavorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(listFavorites));
      console.log("hola efecto", listFavorites);
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

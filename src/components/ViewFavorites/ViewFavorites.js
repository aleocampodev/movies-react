import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";

const localListFavorites = localStorage.getItem("favorites");
//const listFavorites = JSON.parse(localListFavorites);

const ViewFavorites = () => {
  const [listFavoritesStar, setListFavoritesStar] = useState(
    JSON.parse(localListFavorites)
  );

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

  /*const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const favs = JSON.parse(localFavorites);
      console.log(favs, "hola favs");
      setListFavorites(favs);
      const findMovie = favs.find((element) => element.id === id);

      if (findMovie) {
        setIsFavorite(true);
      }
    } */

  /*useEffect(() => {
    if (listFavoritesStar) {
      
      
    }
    /* if (listFavorites) {
      listFavorites.map((item, id) => {
        console.log(item, "hola elemento");
        /*const findStar = listFavoritesStar.find((element) => {
          console.log(element, "elemento");
          return element.id !== id;
        });

        if (findStar) {
          const localStorageFavorites = [{ ...item, findStar }];
          console.log(localStorageFavorites, "hola listaosj");
          localStorage.setItem(
            "favorites",
            JSON.stringify(localStorageFavorites)
          );
        }
      });
      console.log(listFavorites, "hola listFavorites");
    }*/

  useEffect(() => {
    if (listFavoritesStar !== null && listFavoritesStar.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(listFavoritesStar));
      console.log("hola efecto", listFavoritesStar);
    }
  }, [listFavoritesStar]);

  console.log(listFavoritesStar, "Hola favorita ");

  return (
    <>
      {!listFavoritesStar && <p>Escoge una pelicula</p>}
      {listFavoritesStar &&
        listFavoritesStar.map((element) => {
          return (
            <div key={element.id}>
              <p>{element.id}</p>
              <StarRating
                setRating={onChange}
                rating={element.rating || 0}
                elementId={element.id}
              />
            </div>
          );
        })}
      <button>
        <Link to="/">Return</Link>
      </button>
    </>
  );
};

export default ViewFavorites;

import React, { useEffect, useState } from "react";
//import {  useParams, Link } from "react-router-dom";
import "./movie-detail.css";

const MovieDetail = () => {
  const [idMovie, setIdMovie] = useState(" ");
  const [status,setStatus]=useState(200)

  const getDetailMovie = async () => {
    // search
    const res = await fetch(
      //`https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/tt0411008`
      `https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/${idMovie}`
    );
    const resJSON = await res.json();
    console.log(resJSON, "holajson2");
    setIdMovie(resJSON.results);
  };

  useEffect(() => {
    getDetailMovie();
  }, [idMovie]);

  /*const getUser = (idMovie) => {
    return movies.find((movie) => movie.id === idMovie);
  };
  const params = useParams();

  const movie = getUser(params.movieId);*/

  return (
    <div className="movie-detail">
      <p>hola</p>
    </div>
  );
};

export default MovieDetail;

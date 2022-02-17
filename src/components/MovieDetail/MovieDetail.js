import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import "./movie-detail.css";

const MovieDetail = () => {
  const { movies } = useOutletContext();

  const getUser = (id) => {
    return movies.find((movie) => movie.id === id);
  };
  const params = useParams();

  const movie = getUser(params.movieId);

  return (
    <div className="movie-detail">
      <Link to="/">Eliminar pelicula</Link>
      <h4>{movie.title}</h4>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetail;

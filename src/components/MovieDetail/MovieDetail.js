import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//import {  useParams, Link } from "react-router-dom";
import "./movie-detail.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});

  const [status, setStatus] = useState(200);

  const { movieId } = useParams();

  const getDetailMovie = async () => {
    // search
    const res = await fetch(
      //`https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/tt0411008`
      `https://imdb-api.com/en/API/Title/k_9ggk3275/${movieId}`
    );
    const resJSON = await res.json();
    setMovieDetail(resJSON);
  };

  useEffect(() => {
    getDetailMovie();
  }, [movieId]);

  return (
    <div className="movie-detail">
      <h2>{movieDetail.title}</h2>
      <p>{movieDetail.releaseDate}</p>
      <p>{movieDetail.plot}</p>
      <p>{movieDetail.directors}</p>
      <p>{movieDetail.runtimeStr}</p>
      <img src={movieDetail.image} alt={movieDetail.title} />

      {movieDetail.actorList?.map((element) => (
        <div key={element.id}>
          <p>{element.name}</p>
          <img src={element.image} alt={element.name} />
        </div>
      ))}
      <p>{movieDetail.awards}</p>
      <p>{movieDetail.companies}</p>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default MovieDetail;

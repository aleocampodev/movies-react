import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./movie-detail.css";
import "../../queries.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
    localStorage.clear();
  };

  const { movieId } = useParams();

  console.log(useParams(), "hola params");

  const getDetailMovie = async () => {
    const detailMovie = localStorage.getItem("detailMovie");

    if (detailMovie !== null) {
      setMovieDetail(JSON.parse(detailMovie));
      /*const findMovieDetail = movieDetail.find(
        (element) => element.id === element.id
      );
      setMovieDetail(JSON.parse(findMovieDetail));*/
    } else {
      // search
      const res = await fetch(
        `https://imdb-api.com/en/API/Title/k_wwo8vztv/${movieId}`
      );
      const resJSON = await res.json();
      console.log("hola JSOOON", resJSON);
      setMovieDetail(resJSON);
      /* setMovieDetail([...movieDetail, resJSON]);
      console.log(movieDetail, "hola");*/
      localStorage.setItem("detailMovie", JSON.stringify(resJSON));
    }
  };

  useEffect(() => {
    getDetailMovie();
  }, [movieId]);

  return (
    <div className="movie-detail">
      <div className="movie-detail-wrapper">
        <div className="header">
          <h2>{movieDetail.title}</h2>
          <div className="header-link">
            <button className="link" onClick={handleReturn}>
              Return
            </button>
          </div>
        </div>
        <div className="movie-detail-container">
          <img
            src={movieDetail.image}
            alt={movieDetail.title}
            className="movie-detail-image"
          />
          <div className="movie-detail-text">
            <p>
              <strong>Release date: </strong>
              {movieDetail.releaseDate}
            </p>
            <p>
              <strong>Resume: </strong>
              {movieDetail.plot}
            </p>
            <p>
              <strong>Director: </strong>
              {movieDetail.directors}
            </p>
            <p>
              <strong>Duration time: </strong>
              {movieDetail.runtimeStr}
            </p>
            <p>
              <strong>Awards: </strong>
              {movieDetail.awards}
            </p>
            <p>
              <strong>Companies that participated in this film: </strong>
              {movieDetail.companies}
            </p>
          </div>
        </div>
      </div>

      <h3>Actors</h3>
      <div className="actors">
        {movieDetail.actorList?.map((element) => (
          <div key={element.id} className="actors-list">
            <img src={element.image} alt={element.name} />
            <p>{element.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;

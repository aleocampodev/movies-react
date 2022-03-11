import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./movie-detail.css";
import "../../queries.css";
import Loading from "../Loading/Loading";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    server: false,
    noData: false,
  });

  const handleReturn = () => {
    navigate(-1);
    if (localStorage.getItem("detailMovie")) {
      localStorage.removeItem("detailMovie");
    }
  };

  const { movieId } = useParams();

  const getDetailMovie = async () => {
    const detailMovie = localStorage.getItem("detailMovie");

    if (detailMovie !== null) {
      setMovieDetail(JSON.parse(detailMovie));
    } else {
      setStatus({ loading: false, server: false, noData: false });
      try {
        const res = await fetch(
          `https://imdb-api.com/en/API/Title/k_wwo8vztv/${movieId}`
        );
        if (res.status === 200) {
          setStatus({
            loading: false,
            server: false,
            noData: false,
          });
        } else if (res.status === 404) {
          setStatus({
            loading: false,
            server: false,
            noData: true,
          });
        } else if (res.status === 500) {
          setStatus({
            loading: false,
            server: true,
            noData: false,
          });
        }
        const resJSON = await res.json();

        setMovieDetail(resJSON);

        localStorage.setItem("detailMovie", JSON.stringify(resJSON));
        setStatus({
          loading: true,
          server: false,
          noData: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getDetailMovie();
  }, [movieId]);

  useEffect(() => {
    if (status.loading) {
      setStatus({
        loading: true,
        server: false,
        noData: false,
      });
    }

    if (!status.loading) {
      setTimeout(() => {
        setStatus({
          loading: false,
          server: false,
          noData: false,
        });
      }, 3000);
    }
  }, [status.loading]);

  return (
    <div>
      {!status.loading && status.noData && (
        <p className="error">There is no movie</p>
      )}
      {!status.loading && status.server && (
        <p className="error">Server Error</p>
      )}
      {status.loading ? (
        <Loading />
      ) : (
        <div
          className={
            status.server || status.noData ? "notShow" : "movie-detail"
          }
        >
          <div className="movie-detail-wrapper">
            <div className="header">
              <h2>{movieDetail.title}</h2>
              <div className="header-link">
                <button
                  onClick={handleReturn}
                  className="linkButton linkViewFavorites linkButtonMovie"
                >
                  <svg
                    width="19px"
                    height="14px"
                    viewBox="0 0 24 24"
                    className="icon"
                  >
                    <path d="M11.4939 20.5644C11.1821 20.8372 10.7083 20.8056 10.4356 20.4939L3.43557 12.4939C3.18814 12.2111 3.18814 11.7889 3.43557 11.5061L10.4356 3.50613C10.7083 3.1944 11.1822 3.16281 11.4939 3.43557C11.8056 3.70834 11.8372 4.18216 11.5644 4.49388L5.65283 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.65283 12.75L11.5644 19.5061C11.8372 19.8179 11.8056 20.2917 11.4939 20.5644Z" />
                  </svg>
                  <span>Go Back</span>
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
      )}
    </div>
  );
};

export default MovieDetail;

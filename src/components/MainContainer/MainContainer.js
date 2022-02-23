import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import "./main-container.css";
import PopularMovies from "../PopularMovies/PopularMovies";
import "../../queries.css";

function MainContainer() {
  const [movies, setMovies] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState({
    loading: false,
    server: false,
    noData: false,
  });
  //const [hasError, setHasError] = useState(false);

  const getMovie = (nameMovie) => {
    setStatus({ loading: true, server: false, noData: false });
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_ymjg9h02/${nameMovie}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
        setStatus({
          loading: false,
          server: false,
          noData: false,
        });
        if (!movies.length) {
          setStatus({
            loading: false,
            server: false,
            noData: true,
          });
        }
        reset();
      })
      .catch((error) => {
        console.log(error);
        setStatus({
          loading: false,
          server: true,
          noData: false,
        });
        reset();
      });

    setStatus({
      loading: true,
      server: false,
      noData: false,
    });
  };

  const onSubmit = (value) => {
    getMovie(value.nameMovie);
  };

  return (
    <>
      <div className="main-container">
        <div className="box-right">
          <Header />

          <div className="form-input">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("nameMovie", {
                  minLength: {
                    value: 1,
                    message: "Must have a maximum of 1 character",
                  },
                  maxLength: {
                    value: 12,
                    message: "Must have a maximum of 12 characters",
                  },
                  pattern: {
                    value: /[A-Za-z0-9_]/,
                    message: "The format must be alphanumeric",
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message:
                      "You can not leave spaces, neither at the beginning, nor at the end",
                  },
                })}
                type="search"
                placeholder="Search"
                name="nameMovie"
                autoFocus
              />
            </form>
            {<p className="status">{errors?.nameMovie?.message}</p>}
          </div>
          {!movies.length && !status.loading && !status.noData && (
            <PopularMovies />
          )}

          {!movies.length && status.noData && (
            <p className="error">There is no movie with that name</p>
          )}
          {status.server && <p className="error">Server Error</p>}
          {status.loading ? (
            <Loading />
          ) : (
            <div className="content-card">
              {movies &&
                movies.map((movie) => (
                  <Link to={`/${movie.id}`} key={movie.id} className="link">
                    <Card {...movie} />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainContainer;

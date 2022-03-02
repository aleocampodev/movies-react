import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link, useSearchParams } from "react-router-dom";
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
  const [query, setQuery] = useSearchParams();

  //console.log(typeof query.get("search"), query.get("search"), "hola query");

  //const [hasError, setHasError] = useState(false);

  const getMovie = (nameMovie) => {
    const moviesStorage = localStorage.getItem("moviesStorage");

    if (moviesStorage !== null) {
      setMovies(JSON.parse(moviesStorage));
      //console.log("hola movie get");
    } else {
      setStatus({ loading: true, server: false, noData: false });
      fetch(`https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/${nameMovie}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //console.log("movies", data.results);
          if (!data.results || !data.results.length) {
            setStatus({
              loading: false,
              server: false,
              noData: true,
            });
            return;
          }

          setMovies(data.results);
          //setMovies([...movies, ...data.results]);
          //localStorage.setItem("moviesStorage", JSON.stringify(data.results));
          //setMovies([...movies, ...data.results]);
          //console.log(data.results, "movies");
          setStatus({
            loading: false,
            server: false,
            noData: false,
          });
        })
        .catch((error) => {
          console.log(error);
          setStatus({
            loading: false,
            server: true,
            noData: false,
          });
        });
    }
  };

  useEffect(() => {
    if (query.get("search")) {
      getMovie(query.get("search"));
    }
  }, []);

  /*useEffect(() => {
    localStorage.setItem("moviesStorage", movies);
  }, [movies]);*/

  const onSubmit = (value) => {
    //console.log("hola jwiw", value.nameMovie);
    getMovie(value.nameMovie);
    setQuery({ search: value.nameMovie });
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
                disabled={status.loading}
                autoFocus
              />
            </form>
            {<p className="status">{errors?.nameMovie?.message}</p>}
          </div>
          {!status.loading && !status.noData && !movies.length && (
            <PopularMovies />
          )}

          {!status.loading && status.noData && !movies.length && (
            <p className="error">There is no movie with that name</p>
          )}
          {status.server && <p className="error">Server Error</p>}
          {status.loading ? (
            <Loading />
          ) : (
            <div className="content-card">
              {movies &&
                movies.map((movie) => <Card {...movie} key={movie.id} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainContainer;

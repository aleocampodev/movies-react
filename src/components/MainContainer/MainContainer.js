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
    const moviesStorage = localStorage.getItem("moviesStorage" + nameMovie);

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
          console.log("movies", data.results);
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
          localStorage.setItem(
            "moviesStorage" + nameMovie,
            JSON.stringify(data.results)
          );
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
          <Link to="/list-favorites" className="linkButton linkViewFavorites">
            <svg
              width="19px"
              height="14px"
              viewBox="0 0 24 24"
              className="icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4939 20.5644C11.1821 20.8372 10.7083 20.8056 10.4356 20.4939L3.43557 12.4939C3.18814 12.2111 3.18814 11.7889 3.43557 11.5061L10.4356 3.50613C10.7083 3.1944 11.1822 3.16281 11.4939 3.43557C11.8056 3.70834 11.8372 4.18216 11.5644 4.49388L5.65283 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.65283 12.75L11.5644 19.5061C11.8372 19.8179 11.8056 20.2917 11.4939 20.5644Z"
              />
            </svg>
            <span>See Favorites List</span>
          </Link>
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

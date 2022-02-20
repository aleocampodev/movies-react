import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import Card from "../Card/Card";
import "./main-container.css";

function MainContainer() {
  const [movies, setMovies] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  /*const spiderMovie = async () => {
    try {
      const res = await fetch(
        `https://imdb-api.com/en/API/SearchMovie/k_eq0u6qz8/spider%20man`
      );
      const resJSON = await res.json();
      console.log(resJSON, "holajson");
      setMovies(resJSON.results);
    } catch (error) {
      console.log(error);
    }
  };*/

  const getMovie = (nameMovie) => {
    setIsLoading(true);
    setHasError(false);
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_wwo8vztv/${nameMovie}`)
      .then((res) => {
        console.log(res, "hola res");
        return res.json();
      })
      .then((data) => {
        console.log(data.results, "trayendo data");
        setMovies(data.results);
        setIsLoading(false);
        setHasError(false);
        if (
          !data.results ||
          data.results.length === 0 ||
          data.results === null
        ) {
          setHasError(true);
          console.log(data, "data");
        }
        reset();
        setIsLoading(false);
        setHasError(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
        setIsLoading(false);
      });
    setIsLoading(true);
    setHasError(false);
  };

  const onSubmit = (value) => {
    console.log("hola evento", errors, value.nameMovie);
    getMovie(value.nameMovie);
  };

  /*useEffect(() => {
    spiderMovie();
  }, []);*/

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
                    message: "Debe tener como mínimo 1 caracter",
                  },
                  maxLength: {
                    value: 12,
                    message: "Debe tener como máximo 12 caraceteres",
                  },
                  pattern: {
                    value: /([a-zA-Z0-9\s]){1,15}[^\s]/,
                    message: "El formato debe ser alfanumérico",
                  },
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Sin espacios al principio, ni al final",
                  },
                })}
                type="search"
                placeholder="Buscar película"
                name="nameMovie"
                autoFocus
              />
              {<p>{errors?.nameMovie?.message}</p>}
            </form>
          </div>
          {hasError && <p>no hay ninguna pelicula con ese nombre</p>}
          {isLoading ? (
            <p>Loading</p>
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

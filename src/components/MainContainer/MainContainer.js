import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import "./main-container.css";

function MainContainer() {
  const [movies, setMovies] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const spiderMovie = async () => {
    try {
      const res = await fetch(
        `https://imdb-api.com/en/API/SearchMovie/k_eq0u6qz8/spider%20man`
      );
      const resJSON = await res.json();
      
      setMovies(resJSON.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovie = (nameMovie) => {
    setIsLoading(true);
    setHasError(false);
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/${nameMovie}`)
      .then((res) => {
        
        return res.json();
      })
      .then((data) => {
        
        setMovies(data.results);
        setIsLoading(false);
        setHasError(false);
        if (data.results.length === 0 || data.results === null) {
          setHasError(true);
          setIsLoading(false);
          
        }
        reset();
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
        setIsLoading(false);
      });

    setHasError(false);
    setIsLoading(true);
  };

  const onSubmit = (value) => {
    
    getMovie(value.nameMovie);
  };

  useEffect(() => {
    spiderMovie();
  }, []);

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
                    message:
                      "No se pueden espacios ni al principio, ni al final",
                  },
                })}
                type="search"
                placeholder="Buscar película"
                name="nameMovie"
                autoFocus
              />
            </form>
            {<p className="status">{errors?.nameMovie?.message}</p>}
          </div>
          {hasError && (
            <p className="error">No hay ninguna pelicula con ese nombre</p>
          )}
          {isLoading ? (
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

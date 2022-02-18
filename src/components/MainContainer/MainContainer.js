import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../Card/Card";
import "./main-container.css";
import MovieDetail from "../MovieDetail/MovieDetail";

function MainContainer() {
  const [movies, setMovies] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState(200);

  const spiderMovie = async () => {
    const moviesStorage = localStorage.getItem("moviesStorage");
    if (moviesStorage !== undefined ) {
      setMovies(JSON.parse(moviesStorage));
    } else {
      const res = await fetch(
        `https://imdb-api.com/en/API/SearchMovie/k_wwo8vztv/spider%20man`
      );
      const resJSON = await res.json();
      console.log(resJSON, "holajson");
      setMovies(resJSON.results);
      localStorage.setItem("moviesStorage", JSON.stringify(resJSON.results));
    }
  };

  const getMovie = (nameMovie) => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_wwo8vztv/${nameMovie}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.results, "trayendo data");
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(movies, "movies");

  const onSubmit = (value) => {
    console.log("hola evento", errors, value.nameMovie);
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
                    value: /^([a-zA-Z0-9_-]){1,16}$/,
                    message: "El formato debe ser alfanumérico",
                  },
                })}
                type="search"
                placeholder="Buscar película"
                name="nameMovie"
                autoFocus
              />
            </form>
          </div>
          <div className="content-card">
            {movies &&
              movies.map((movie) => (
                <Link to={movie.id.toString()} key={movie.id} className="link">
                  <Card {...movie} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContainer;

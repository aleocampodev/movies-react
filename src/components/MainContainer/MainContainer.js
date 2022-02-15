import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Error from "../Error/Error";
import FilterMovies from "../FilterMovies/FilterMovies";
import "./main-container.css";
import { ErrorBoundary } from "react-error-boundary";

function MainContainer() {
  const [movie, setMovie] = useState(null);
  const [nameMovie, setNameMovie] = useState("");
  const [status, setStatus] = useState(200);

  const handleChange = (event) => {
    setNameMovie(event.target.value);
  };

  const getMovie = () => {
    fetch(`https://www.omdbapi.com/?apikey=1b6240e6&t=spider%20man`)
      .then((res) => {
        const data = res.json();
        if (res.status === 200 && data) {
          return data;
        } else if (res.status === 404) {
          setStatus(404);
        } else {
          setStatus(500);
        }
      })
      .then((data) => setMovie(data))
      .catch((error) => {
        console.log(error);
        setStatus(500, { error });
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  

  return (
    <div className="main-container">
      <div>
        <Header />
        <div className="form-input">
          <form>
            <input
              type="search"
              value={nameMovie}
              onChange={handleChange}
              placeholder="Escribe la pelicula"
              className="input"
            />
          </form>
        </div>
        {movie && (
          <>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </>
        )}
        {status === 404 && <Error message="No se encontraron peliculas" />}
        {status === 500 && <Error message="Error en el servidor" />}
      </div>
    </div>
  );
}

export default MainContainer;

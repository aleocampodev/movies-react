import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Error from "../Error/Error";
import "./movie-list.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [nameMovie, setNameMovie] = useState("");
  const [status, setStatus] = useState(200);

  const handleChange = (event) => {
    setNameMovie(event.target.value);
  };
  console.log(movies, "hola movies");

  const getMovie = () => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_2sac2q7s/spider%20man`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 404) {
          setStatus(404);
        } else {
          setStatus(500);
        }
      })
      .then((data) => {
        console.log(data, "hola data");
        setMovies(data);
        if (!data || data.length === 0) {
          setStatus(404);
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus(500, { error });
      });
  };

  console.log(status, "hola estado", movies);

  useEffect(() => {
    getMovie(nameMovie);
  }, [nameMovie]);

  useEffect(() => {
    return () => {
      setNameMovie([]);
    };
  });
  console.log(status, "holajs");

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return (
    <>
      <React.Suspense fallback={<h1>Cargando peliculas...</h1>}>
        <div className="box-left">
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

          {status === 404 && <Error message="No se encontraron peliculas" />}
          {status === 500 && <Error message="Error en el servidor" />}
          {movies && movies.map((movie) => <p>{movie.description}</p>)}
        </div>
      </React.Suspense>
    </>
  );
};

export default MovieList;

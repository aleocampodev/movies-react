import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./movie-list.css";

import { Suspense, lazy } from "@uploadcare/client-suspense";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [nameMovie, setNameMovie] = useState("");
  const [status, setStatus] = useState(200);

  const handleChange = (event) => {
    setNameMovie(event.target.value);
  };
  console.log(movies, "hola movies");

  const getMovie = (searchMovie) => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_2sac2q7s/${searchMovie}`)
      .then((res) => {
        if (res.status === 200) {
          res.json();
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
        setStatus(500);
      });
  };

  useEffect(() => {
    getMovie(nameMovie);
  }, [nameMovie]);

  return (
    <>
		<Suspense fallback={<h1>Cargando peliculas...</h1>} >
			<div className="box-left">
        		<Header />
        		<div className="form-input">
          			<form onSubmit={getMovie}>
            			<input
              				type="search"
              				value={nameMovie}
              				onChange={handleChange}
              				placeholder="Escribe la pelicula"
              				className="input"
            	    	/>
          			</form>
        		</div>
      		</div>
		</Suspense>
    </>
  );
};

export default MovieList;

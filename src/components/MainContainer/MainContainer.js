import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Error from "../Error/Error";
import FilterMovies from "../FilterMovies/FilterMovies";
import "./main-container.css";
import { ErrorBoundary } from "react-error-boundary";

function MainContainer() {
  const [movies, setMovies] = useState(null);
  const [nameMovie, setNameMovie] = useState("");
  const [status, setStatus] = useState(200);

  const handleChange = (event) => {
     setNameMovie(event.target.value);
  };

  const handleSubmit = (e) => {
	  e.preventDefault();
	  
	  getMovie()
  }

  /*const getMovie = (searchTerm) => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_9u3ckjd1/${searchTerm}`)
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
      .then((data) => setMovies(data))
      .catch((error) => {
        console.log(error);
        setStatus(500, { error });
      });
  };

  useEffect(() => {
    getMovie(nameMovie);
  }, [nameMovie]);*/

  return (
    <div className="main-container">
        <Header />
        <div className="form-input">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Busca la pelicula"
              value={nameMovie}
            />
			<button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
    </div>
  );
}

export default MainContainer;

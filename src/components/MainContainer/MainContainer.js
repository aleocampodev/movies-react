import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Error from "../Error/Error";
import FilterMovies from "../FilterMovies/FilterMovies";

function MainContainer() {
  const [movies, setMovies] = useState([]);
  const [nameMovie, setNameMovie] = useState("");
  const [status, setStatus] = useState(200);

  const handleChange = (e) => {
    console.log("bu");
    setNameMovie(e.target.value.trim());
  };

  /*const handleSubmit = (e) => {
    console.log("si");
    e.preventDefault();
    getMovie(nameMovie);
    setNameMovie("");
  };*/ //ya no uso handleSubmit es igual que habdleKeyDown, no se uso useEffect ya que con keyDown estoy cargando la data

  const getMovie = () => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_9u3ckjd1/${nameMovie}`)
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
      .then((data) => {
        console.log(data.results, "holi");
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
        setStatus(500, { error });
      });
  };

  console.log(movies, "movies");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && nameMovie) {
      e.preventDefault();

      getMovie();
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="form-input">
        <form>
          <input
            type="text"
            placeholder="Busca la pelicula"
            autoFocus
            value={nameMovie}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
    </div>
  );
}

export default MainContainer;

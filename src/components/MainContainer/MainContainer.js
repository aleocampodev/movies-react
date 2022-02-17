import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link, Outlet } from "react-router-dom";
import ContainerMovieDetail from "../ContainerMovieDetail/ContainerMovieDetail";
import Card from "../Card/Card";
import "./main-container.css";

function MainContainer() {
  const [movies, setMovies] = useState([]);
  const [nameMovie, setNameMovie] = useState(" ");
  const [status, setStatus] = useState(200);

  const handleChange = (e) => {
    console.log("bu", e);

    setNameMovie(e.target.value.replace(/\s+/g, " "));
  };

  /*const handleSubmit = (e) => {
    console.log("si");
    e.preventDefault();
    getMovie(nameMovie);
    setNameMovie("");
  };*/ //ya no uso handleSubmit es igual que habdleKeyDown, no se uso useEffect ya que con keyDown estoy cargando la data

  const spiderMovie = async () => {
    // search
    const res = await fetch(
      `https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/spider%20man`
    );
    const resJSON = await res.json();
    console.log(resJSON, "holajson");
    setMovies(resJSON.results);
  };

  const getMovie = () => {
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_9ggk3275/${nameMovie}`)
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
        console.log(data.results, "trayendo data");
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

  useEffect(() => {
    spiderMovie();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="box-right">
          <Header />
          <div className="form-input">
            <form>
              <input
                type="search"
                placeholder="Busca la pelicula"
                value={nameMovie}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
        <section>
          <ContainerMovieDetail />
          <Outlet context={{ movies }} />
        </section>
      </div>
    </>
  );
}

export default MainContainer;

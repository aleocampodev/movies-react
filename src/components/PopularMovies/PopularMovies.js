import React, { useState, useEffect } from "react";
import "./popular-movies.css";
import "../../queries.css";

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const getPopularMovies = async () => {
    try {
      const res = await fetch(
        `https://imdb-api.com/en/API/MostPopularMovies/k_eq0u6qz8`
      );
      const resJSON = await res.json();
      setPopularMovies(resJSON.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <>
      <h3>The most popular movies 30 </h3>
      <div className="popular-container">
        <div className="popular-movie">
          {popularMovies &&
            popularMovies
              .sort((a, b) => b.year - a.year)
              .filter((item) => item.rank <= 30)
              .map((item) => {
                return (
                  <div key={item.id} className="movie-container">
                    <img
                      className="movie-image"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="movie-content">
                      <h4>{item.title}</h4>
                      <p>{item.year}</p>
                      <p>
                        <strong>Crew:</strong> {item.crew}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default PopularMovies;

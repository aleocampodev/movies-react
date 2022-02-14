import React from "react";
import BoxLeft from "./components/BoxLeft/MovieList";
import FilterMovies from "./components/FilterMovies/FilterMovies";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BoxLeft/>
      <FilterMovies />
    </div>
  );
}

export default App;

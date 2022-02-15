import React from "react";
import BoxLeft from "./components/BoxLeft/MovieList";
import FilterMovies from "./components/FilterMovies/FilterMovies";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <div className="App">
        <BoxLeft />
        <FilterMovies />
      </div>
    </ErrorBoundary>
  );
}

export default App;

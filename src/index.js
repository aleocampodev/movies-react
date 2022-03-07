import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ViewFavorites from "./components/ViewFavorites/ViewFavorites";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:movieId" element={<MovieDetail />} />
      <Route path="/list-favorites" element={<ViewFavorites />} />
      <Route path="*" element={<div>404-not found</div>} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

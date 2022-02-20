import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:movieId" element={<MovieDetail />} />
      <Route path="*" element={<div>404-not found</div>} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

import React from "react";
import logo from "../../assets/images/moviesLogo.jpeg";
import "./header.css";

const Header = () => {
  return (
    <>
      <header className="App-header">
        <h1 className="title">Buscador de peliculas</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </>
  );
};

export default Header;

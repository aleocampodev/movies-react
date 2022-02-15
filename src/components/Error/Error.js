import React from "react";

const Error404 = ({ message }) => {
  return (
    <header className="site-home-header">
      <div>
        <h2 className="w-screen flex justify-center item-center m-o">
          {message}
        </h2>
      </div>
    </header>
  );
};

export default Error404;
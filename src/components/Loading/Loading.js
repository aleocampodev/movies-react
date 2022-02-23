import React from "react";
import loading from "../../assets/loading.gif";
import "./loading.css";
import "../../queries.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading" className="loading-img" />
    </div>
  );
};

export default Loading;

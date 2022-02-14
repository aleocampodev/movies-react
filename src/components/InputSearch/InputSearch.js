import React from "react";


const InputSearch = ({nameMovie, setNameMovie}) => {
 

  const handleChange = (event) => {
    setNameMovie(event.target.value);
  };


  return (
  
      <div className="form-input">
        <form>
          <input
            type="search"
            value={nameMovie}
            onChange={handleChange}
            placeholder="Escribe la pelicula"
            className="input"
          />
        </form>
      </div>
   
  );
};

export default InputSearch;

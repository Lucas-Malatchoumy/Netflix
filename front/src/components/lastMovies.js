import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LastMovies(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
    }, [])

    function getMovies() {
        axios.get(`http://localhost:3001/Netflix/movies/getlastMovies`).then((response) => {
          console.log(response.data);
          setMovies(response.data)
        });
    }
  return (
    <><h1 className="category-title">Latest Movies</h1><div className="category-movies">
      {movies.map((movie) => {
        return (
            <div className="card-movie" key={movie.id}>
            <img src={movie.image}></img>
            <span>{movie.title}</span>
          </div>
        );
      })}
    </div></>
  );
}
export default LastMovies;
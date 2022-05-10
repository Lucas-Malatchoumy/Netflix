import React, { useState, useEffect, } from "react";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Category from "../components/movieByCat";
import("./categories.css");

function Search() {
  const [movies, setMovies] = useState([])
  let location = useLocation()
  console.log(location);
  let data = location.state;

  useEffect(() => {
    getMovies();
  }, [data]);

  function getMovies() {
    axios.get(`http://localhost:3001/Netflix/movies/search/${data}`)
      .then((response) => {
        setMovies(response.data);
      });
  }

  return (
    <div className="category"><div className="category-movies">
      {movies.map((movie) => {
        return (
          <Link to={`/movies/${movie.id}`}>
            <div className="card-movie" key={movie.id}>
            <img src={movie.image}></img>
            <span>{movie.title}</span>
          </div>
          </Link>
        );
      })}
    </div></div>
  );
}
export default Search;
